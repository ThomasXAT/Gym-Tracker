<?php

namespace App\Controller;

use App\Entity\Athlete;
use App\Form\LoginType;
use App\Form\RegisterType;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Http\Authentication\AuthenticationUtils;

#[Route(path: '/authentication', name: 'authentication_')]
class SecurityController extends AbstractController
{
    #[Route(path: '/login', name: 'login')]
    public function login(Request $request, AuthenticationUtils $authenticationUtils): Response
    {
        if (!$this->getUser()) {
            $athlete = new Athlete();
            $form = $this->createForm(LoginType::class, $athlete, [
                'action' => $this->generateUrl('authentication_login')
            ]);
            $form->handleRequest($request);
            if ($form->isSubmitted() && $form->isValid()) {
                $athlete = $form->getData();
                return $this->redirectToRoute('root');
            }
            else {
                return $this->render('authentication/login/index.html.twig', [
                    'form' => $form,
                ]);
            }
        }
        else {
            return $this->redirectToRoute('root');
        }
    }

    #[Route(path: '/logout', name: 'logout')]
    public function logout(): void
    {}
    
    #[Route('/register', name: 'register')]
    public function register(Request $request, UserPasswordHasherInterface $userPasswordHasher, EntityManagerInterface $entityManager): Response
    {
        $athlete = new Athlete();
        $form = $this->createForm(RegisterType::class, $athlete);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            // encode the plain password
            $athlete->setPassword(
                $userPasswordHasher->hashPassword(
                    $athlete,
                    $form->get('password')->getData()
                )
            );

            $entityManager->persist($athlete);
            $entityManager->flush();
            // do anything else you need here, like send an email

            return $this->redirectToRoute('root');
        }

        return $this->render('authentication/register/index.html.twig', [
            'form' => $form->createView(),
        ]);
    }
}
