<?php

namespace App\Controller;

use App\Entity\Athlete;
use App\Repository\AthleteRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

class AthleteController extends AbstractController
{
    // API

    #[Route('api/athlete', name: 'api_athlete')]
    public function list(AthleteRepository $athleteRepository) {
        $athletes = $athleteRepository->findAll();
        $result = array();
        for($i = 0; $i < sizeof($athletes); $i++) {
            $result[strtolower($athletes[$i]->getUserIdentifier())]['username'] = $athletes[$i]->getUsername();
            $result[strtolower($athletes[$i]->getUserIdentifier())]['firstname'] = $athletes[$i]->getFirstname();
            $result[strtolower($athletes[$i]->getUserIdentifier())]['surname'] = $athletes[$i]->getSurname();
            $result[strtolower($athletes[$i]->getUserIdentifier())]['email'] = $athletes[$i]->getEmail();
            $result[strtolower($athletes[$i]->getUserIdentifier())]['description'] = $athletes[$i]->getDescription();
            $result[strtolower($athletes[$i]->getUserIdentifier())]['height'] = $athletes[$i]->getHeight();
            $result[strtolower($athletes[$i]->getUserIdentifier())]['weight'] = $athletes[$i]->getWeight();
        }
        return $this->json($result);
    }
}