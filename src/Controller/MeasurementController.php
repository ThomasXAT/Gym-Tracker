<?php

namespace App\Controller;

use App\Entity\Measurement;
use App\Repository\MeasurementRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

#[Route(path: '/measurement', name: 'measurement_', methods: ['POST'])]
class MeasurementController extends AbstractController
{
    #[Route(path:'/delete/{id}', name: 'delete')]
    public function delete(Measurement $measurement, MeasurementRepository $measurementRepository): Response
    {        
        if ($this->getUser() === $measurement->getAthlete()) {
            $measurementRepository->remove($measurement, true);
            return $this->redirectToRoute('measurements', ['username' => $measurement->getAthlete()->getUsername()]);
        }
        return $this->redirectToRoute('home');
    }
}