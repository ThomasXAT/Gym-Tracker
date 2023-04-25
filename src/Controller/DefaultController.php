<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Translation\Translator;

class DefaultController extends AbstractController
{
    private $translator;

    public function __construct() {
        $this->translator = new Translator('fr');
    }

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
        $page = 'home';
        return $this->render('main/home/index.html.twig', [
            'title' => $this->translator->trans('main.'.$page.'.page'),
            'page' => $page,
        ]);
    }

    #[Route('/repertory', name: 'repertory')]
    public function repertory(): Response
    {
        $page = 'repertory';
        return $this->render('main/repertory/index.html.twig', [
            'title' => $this->translator->trans('main.'.$page.'.page'),
            'page' => $page,
        ]);
    }

    #[Route('/statistics', name: 'statistics')]
    public function statistics(): Response
    {
        $page = 'statistics';
        return $this->render('main/statistics/index.html.twig', [
            'title' => $this->translator->trans('main.'.$page.'.page'),
            'page' => $page,
        ]);
    }

    #[Route('/profile/{username}', name: 'profile')]
    public function profile(): Response
    {
        $page = 'profile';
        return $this->render('main/profile/index.html.twig', [
            'title' => $this->translator->trans('main.'.$page.'.page'),
            'page' => $page,
        ]);
    }
}
