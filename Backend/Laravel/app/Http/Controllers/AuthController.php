<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Http\Requests\RegisterRequest;
use App\Http\Requests\LoginRequest;
use Illuminate\Support\Facades\Hash;
use App\Repositories\AuthRepository;
use App\Http\Resources\UserResource;
use JWTAuth;
use Tymon\JWTAuth\Contracts\JWTSubject;
use Illuminate\Http\Response;
use App\Traits\ApiResponseTrait;

class AuthController extends Controller
{

    use ApiResponseTrait;

    private $authRepository;

    /**
     * Set users to api consume
     *
     * @return \Illuminate\Http\Response
     */
    public function __construct(AuthRepository $authRepository)
    {
        $this->authRepository = $authRepository;
    }

    public function register(RegisterRequest $request)
    {
        try {
            $user = $this->authRepository->register($request->validated());
            if($user){
                return self::apiResponseSuccess(null, 'Usuario registrado', Response::HTTP_OK);
            }
        } catch (\Exception $e) {
            return self::apiServerError($e->getMessage());
        }
    }

    public function login(LoginRequest $request)
    {

                try {
            $token = $this->authRepository->login($request->validated());
            return self::apiResponseSuccess(UserResource::make($token), 'Usuario logeado', Response::HTTP_OK);
        } catch (\Exception $e) {
            return self::apiServerError($e->getMessage());
        }
    }

    public function logout()
    {
        try {
            $this->authRepository->logout();
            return self::apiResponseSuccess(null, 'Usuario deslogeado', Response::HTTP_OK);
        } catch (\Exception $e) {
            return self::apiServerError($e->getMessage());
        }
    }

    public function user()
    {
        try {
            $user = $this->authRepository->user();
            return self::apiResponseSuccess(UserResource::make($user), 'Datos de Usuario', Response::HTTP_OK);
        } catch (\Exception $e) {
            return self::apiServerError($e->getMessage());
        }
    }
}
