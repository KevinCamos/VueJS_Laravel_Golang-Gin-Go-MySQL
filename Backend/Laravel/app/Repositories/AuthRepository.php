<?php

namespace App\Repositories;
use Tymon\JWTAuth\Contracts\JWTSubject;
use App\Models\User;

class AuthRepository{

    public function register($data)
    {
        $data = [
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => bcrypt($data['password']),
            'appointment' => 'client',
        ];
        $user = User::create($data);
        return $user;
    }

    public function authAdmin($data)
    {
        // if (!$token = auth()->attempt($data)) {
        //     throw new \Exception('Email o passwd incorrectos, intente nuevamente', -404);
        // }
        $out = new \Symfony\Component\Console\Output\ConsoleOutput();

        $out->writeln("---------------DATA-------------------");
        $out->writeln($data);
        $out->writeln("---------------DATA-------------------");
        $user = User::where('email', $data['email'])->where('appointment', 'gerente')->get();
        $out->writeln("---------------AUTH-------------------");
        $out->writeln($user);
        $out->writeln("---------------AUTH-------------------");
        // $user->token = $token;
        return $user;
    }

    public function login($data)
    {
        if (!$token = auth()->attempt($data)) {
            throw new \Exception('Email o passwd incorrectos, intente nuevamente', -404);
        }
        $user = User::where('email', $data['email'])->get();
        $user->token = $token;
        return $user;
    }

    public function logout()
    {
        if (!auth()->invalidate()) {
            throw new \Exception('Exception', -404);
        }
    }

    public function user()
    {
        $user = auth()->authenticate();
        return $user;
    }

}
