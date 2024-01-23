<?php

namespace App\Controller;

use App\Entity\Athlete;
use App\Entity\Settings;
use App\Form\LoginType;
use App\Form\RegisterType;
use App\Repository\AthleteRepository;
use DateTime;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Http\Authentication\AuthenticationUtils;

#[Route(path: '/authentication', name: 'authentication_')]
class SecurityController extends AbstractController
{
    #[Route(path: '/', name: 'index')]
    public function index(): Response {
        return $this->redirectToRoute('authentication_login');
    }

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
                return $this->redirectToRoute('home');
            }
            else {
                return $this->render('authentication/login/index.html.twig', [
                    'page' => 'login',
                    'form' => $form,
                    'error' => $authenticationUtils->getLastAuthenticationError(),
                ]);
            }
        }
        else {
            return $this->redirectToRoute('home');
        }
    }

    #[Route(path: '/logout', name: 'logout')]
    public function logout(): void
    {}
    
    #[Route(path:'/register', name: 'register')]
    public function register(Request $request, UserPasswordHasherInterface $userPasswordHasher, AthleteRepository $athleteRepository): Response
    {
        if (!$this->getUser()) {
            $athlete = new Athlete();
            $form = $this->createForm(RegisterType::class, $athlete);
            $form->handleRequest($request);
            if ($form->isSubmitted() && $form->isValid()) {
                /**
                 * @var Settings $settings
                 */
                $settings = new Settings();
                $settings
                    ->setJetlag(0)
                    ->setEmail(false)
                    ->setMeasurement(false)
                    ->setBmi(true)
                    ->setTraining(true)
                    ->setUnit("kg")
                    ->setTimer(true)
                    ->setObjective(true)
                ;
                $athlete->setPassword(
                    $userPasswordHasher->hashPassword(
                        $athlete,
                        $form->get('password')->getData()
                    )
                );
                $athlete
                    ->setRegistration(new DateTime())
                    ->setDescription('<p>Je suis nouveau sur <strong>Gym Tracker</strong> !</p>')
                    ->setSettings($settings)
                ;
                $athleteRepository->save($athlete, true);
                // do anything else you need here, like send an email
                return $this->redirectToRoute('home');
            }
            else {
                return $this->render('authentication/register/index.html.twig', [
                    'page' => 'register',
                    'form' => $form,
                ]);
            }
        }
        else {
            return $this->redirectToRoute('home');
        }
    }
}