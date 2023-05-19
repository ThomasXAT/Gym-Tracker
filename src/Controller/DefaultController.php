<?php

namespace App\Controller;

use App\Form\ProfileType;
use App\Repository\AthleteRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Annotation\Route;

class DefaultController extends AbstractController
{
    #[Route('/', name: 'home')]
    public function home(): Response
    {
        if (isset($_GET["search"])) {
            return $this->render('main/repertory/index.html.twig', [
                'page' => 'repertory',
                'search' => $_GET["search"],
            ]);
        }
        return $this->render('main/home/index.html.twig', [
            'page' => 'home',
        ]);
    }

    #[Route('/@{username}', name: 'profile')]
    public function profile(Request $request, UserPasswordHasherInterface $userPasswordHasher, EntityManagerInterface $entityManager, AthleteRepository $athleteRepository, String $username): Response
    {
        $athlete = $athleteRepository->findOneBy(['username' => $username]);
        if ($athlete) {
            if ($this->getUser() == $athlete) {
                $oldPassword = $athlete->getPassword();
                $form = $this->createForm(ProfileType::class, $athlete);
                $form->handleRequest($request);
                if ($form->isSubmitted() && $form->isValid()) {
                    $newPassword = $form->get('password')->getData();
                    if ($newPassword) {
                        $athlete->setPassword(
                            $userPasswordHasher->hashPassword(
                                $athlete,
                                $newPassword,
                            )
                        );
                    }
                    else {
                        $athlete->setPassword($oldPassword);
                    }
                    $entityManager->persist($athlete);
                    $entityManager->flush();
                    if ($newPassword) {
                        return $this->redirectToRoute('authentication_logout');
                    }
                    return $this->redirectToRoute('profile', ['username' => $athlete->getUsername()]);
                }
                else {
                    return $this->render('main/profile/index.html.twig', [
                        'page' => 'profile',
                        'athlete' => $athlete,
                        'form' => $form,
                    ]);
                }
            }
            return $this->render('main/profile/index.html.twig', [
                'page' => 'profile',
                'athlete' => $athlete,
            ]);
        }
        throw new NotFoundHttpException('Athlete not found. The requested user does not exist.');
    }
}