<?php

namespace App\Controller;

use App\Entity\Athlete;
use App\Entity\Training\Session;
use App\Repository\Training\SessionRepository;
use App\Repository\Training\SetRepository;
use DateTime;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\String\Slugger\SluggerInterface;

#[Route(path: '/session', name: 'session_', methods: ['POST'])]
class SessionController extends AbstractController
{
    #[Route(path:'/start', name: 'start')]
    public function start(SessionRepository $sessionRepository, SluggerInterface $sluggerInterface): Response
    {
        /**
         * @var Athlete $user
         */
        $user = $this->getUser();
        if (isset($_POST['title']) && !$sessionRepository->findOneBy(['athlete' => $user, 'current' => true])) {
            $session = new Session();
            $session
                ->setTitle($_POST['title'])
                ->setSlug(strtolower($sluggerInterface->slug($_POST['title'])) . '-' . uniqid())
                ->setAthlete($user)
                ->setStart(new DateTime)
            ;
            $sessionRepository->save($session, true);
        }
        return $this->redirectToRoute('home');
    }

    #[Route(path:'/stop', name: 'stop')]
    public function stop(SessionRepository $sessionRepository): Response
    {
        /**
         * @var Athlete $user
         */
        $user = $this->getUser();
        if ($session = $sessionRepository->findOneBy(['athlete' => $user, 'current' => true])) {
            if ($session->getStart()) {
                $session
                    ->setCurrent(false)
                    ->setEnd(new DateTime)
                ;
                $sessionRepository->save($session, true);
            }
            else {
                $sessionRepository->remove($session, true);
            }
        }
        return $this->redirectToRoute('home');
    }

    #[Route(path:'/edit', name: 'edit')]
    public function edit(SetRepository $setRepository): Response
    {
        foreach ($_POST as $id => $edited) {
            $set = $setRepository->findOneBy(["id" => $id]);
            $set->setSymmetry($edited["symmetry"]);
            $set->setRepetitions($edited["repetitions"]);
            $set->setWeight($edited["weight"]);
            $setRepository->save($set, true);
        }
        return $this->json($_POST);
    }
}