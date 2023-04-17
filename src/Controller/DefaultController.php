<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class DefaultController extends AbstractController
{
    #[Route('/', name: 'root')]
    public function root(): Response
    {
        if ($this->getUser()) {
            return $this->redirectToRoute('home');  
        }
        else {
            return $this->redirectToRoute('authentication_login');
        }
    }

    #[Route('/home', name: 'home')]
    public function home(): Response
    {
        return $this->render('main/home/index.html.twig');
    }

    #[Route('/repertory', name: 'repertory')]
    public function repertory(): Response
    {
        return $this->render('main/repertory/index.html.twig');
    }

    #[Route('/statistics', name: 'statistics')]
    public function statistics(): Response
    {
        return $this->render('main/statistics/index.html.twig');
    }

    #[Route('/profile', name: 'profile')]
    public function profile(): Response
    {
        return $this->render('main/profile/index.html.twig');
    }
}
