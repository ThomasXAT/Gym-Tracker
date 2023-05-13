<?php

namespace App\Controller;

use App\Repository\AthleteRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\Routing\Annotation\Route;

class DefaultController extends AbstractController
{
    #[Route('/', name: 'home')]
    public function home(): Response
    {
        return $this->render('main/home/index.html.twig', [
            'page' => 'home',
        ]);
    }

    #[Route('/repertory', name: 'repertory')]
    public function repertory(): Response
    {
        return $this->render('main/repertory/index.html.twig', [
            'page' => 'repertory',
        ]);
    }

    #[Route('/{username}', name: 'profile')]
    public function profile(AthleteRepository $athleteRepository, String $username): Response
    {
        $athlete = $athleteRepository->findOneBy(['username' => $username]);
        if ($athlete) {
            return $this->render('main/profile/index.html.twig', [
                'page' => 'profile',
                'athlete' => $athlete,
            ]);
        }
        throw new NotFoundHttpException('Athlete not found. The requested user does not exist.');
    }

    #[Route('/{username}/statistics', name: 'statistics')]
    public function statistics(AthleteRepository $athleteRepository, String $username): Response
    {
        $athlete = $athleteRepository->findOneBy(['username' => $username]);
        if ($athlete) {
            return $this->render('main/statistics/index.html.twig', [
                'page' => 'statistics',
                'athlete' => $athlete,
            ]);
        }
        throw new NotFoundHttpException('Athlete not found. The requested user does not exist.');
    }
}
