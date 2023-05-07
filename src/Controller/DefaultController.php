<?php

namespace App\Controller;

use App\Repository\AthleteRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Translation\Translator;

class DefaultController extends AbstractController
{
    private Translator $translator;

    public function __construct() {
        $this->translator = new Translator('fr');
    }

    #[Route('/', name: 'home')]
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

    #[Route('/{username}', name: 'profile')]
    public function profile(AthleteRepository $athleteRepository, String $username): Response
    {
        $page = 'profile';
        return $this->render('main/profile/index.html.twig', [
            'title' => $this->translator->trans('main.'.$page.'.page'),
            'page' => $page,
            'athlete' => $athleteRepository->findOneBy(['username' => $username]),
        ]);
    }

    #[Route('/{username}/statistics', name: 'statistics')]
    public function statistics(AthleteRepository $athleteRepository, String $username): Response
    {
        $page = 'statistics';
        return $this->render('main/statistics/index.html.twig', [
            'title' => $this->translator->trans('main.'.$page.'.page'),
            'page' => $page,
            'athlete' => $athleteRepository->findOneBy(['username' => $username]),
        ]);
    }
}
