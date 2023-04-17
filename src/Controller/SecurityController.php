<?php

namespace App\Controller;

use App\Entity\Athlete;
use App\Form\LoginType;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/authentication', name: 'authentication_')]
class SecurityController extends AbstractController
{
    #[Route('/login', name: 'login')]
    public function login(Request $request): Response
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

    #[Route('/logout', name:'logout')]
    public function logout() {}
}
