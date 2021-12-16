<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Http\Requests\RegisterRequest;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\AuthRequest;
use Illuminate\Support\Facades\Hash;
use App\Repositories\AuthRepository;
use App\Http\Resources\UserResource;
use App\Http\Resources\AuthAdminResource;
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
            if ($user) {
                return self::apiResponseSuccess(null, 'Usuario registrado', Response::HTTP_OK);
            }
        } catch (\Exception $e) {
            return self::apiServerError($e->getMessage());
        }
    }
    public function authAdmin(Request $request)
    {


        try {
            $user = $this->authRepository->authAdmin($request);
            // $out = new \Symfony\Component\Console\Output\ConsoleOutput();
            // $out->writeln("---------------ISADMIN-------------------");
            // $out->writeln(gettype($user));
            if ($user[0]["appointment"]=="gerente") {
                // $out = new \Symfony\Component\Console\Output\ConsoleOutput();
            // $out->writeln("---------------ISADMIN-------------------");
            // $out->writeln(gettype($user));
                return self::apiResponseSuccess(AuthAdminResource::make($request), 'Usuario logeado', Response::HTTP_OK);
            } else {
                return self::apiResponseError(Response::HTTP_UNAUTHORIZED);
            }
        } catch (\Exception $e) {
            return self::apiResponseError(Response::HTTP_UNAUTHORIZED);
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
