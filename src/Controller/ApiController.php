<?php

namespace App\Controller;

use App\Repository\AthleteRepository;
use App\Repository\Culture\QuotationRepository;
use App\Repository\Training\SessionRepository;
use App\Repository\Training\SetRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

#[Route(path:'/api', name: 'api_')]
class ApiController extends AbstractController
{
    #[Route(path:'/athlete', name: 'athlete')]
    public function athlete(AthleteRepository $athleteRepository) {
        $athletes = $athleteRepository->findBy($_GET);
        $result = array();
        for ($i = 0; $i < sizeof($athletes); $i++) {
            $result[$athletes[$i]->getId()]['id'] = $athletes[$i]->getId();
            $result[$athletes[$i]->getId()]['username'] = $athletes[$i]->getUsername();
            $result[$athletes[$i]->getId()]['firstname'] = $athletes[$i]->getFirstname();
            $result[$athletes[$i]->getId()]['surname'] = $athletes[$i]->getSurname();
            $result[$athletes[$i]->getId()]['email'] = $athletes[$i]->getEmail();
            $result[$athletes[$i]->getId()]['picture'] = $athletes[$i]->getPicture();
            $result[$athletes[$i]->getId()]['measurement'] = $athletes[$i]->isMeasurement();
            if ($athletes[$i]->isMeasurement()) {
                $measurement = $athletes[$i]->getMeasurements()[$athletes[$i]->getMeasurements()->count()-1];
                $result[$athletes[$i]->getId()]['height'] = $measurement->getHeight();
                $result[$athletes[$i]->getId()]['weight'] = $measurement->getWeight();
            }
            $result[$athletes[$i]->getId()]['description'] = $athletes[$i]->getDescription();
            $result[$athletes[$i]->getId()]['quotation'] = $athletes[$i]->getQuotation() ? $athletes[$i]->getQuotation()->getId() : null;
        }
        return $this->json($result);
    }

    #[Route(path:'/session', name: 'session')]
    public function session(SessionRepository $sessionRepository) {
        $sessions = $sessionRepository->findBy($_GET);
        $result = array();
        for ($i = 0; $i < sizeof($sessions); $i++) {
            $result[$sessions[$i]->getId()]['id'] = $sessions[$i]->getId();
            $result[$sessions[$i]->getId()]['title'] = $sessions[$i]->getTitle();
            $result[$sessions[$i]->getId()]['subtitle'] = $sessions[$i]->getSubtitle();
            $result[$sessions[$i]->getId()]['athlete'] = $sessions[$i]->getAthlete()->getId();
            $result[$sessions[$i]->getId()]['current'] = $sessions[$i]->isCurrent();
            $result[$sessions[$i]->getId()]['start'] = $sessions[$i]->getStart();
            $result[$sessions[$i]->getId()]['end'] = $sessions[$i]->getEnd();
            $result[$sessions[$i]->getId()]['slug'] = $sessions[$i]->getSlug();
            $exercices = $sessions[$i]->getExercices();
            foreach ($exercices as &$exercice) {
                if ($exercice['sequence']) {
                    foreach ($exercice['exercices'] as &$part) {
                        foreach ($part['sets'] as &$set) {
                            for ($j = 0; $j < sizeof($set); $j++) {
                                $set[$j] = $set[$j]->getId();
                            }
                        }
                    }
                }
                else {
                    foreach ($exercice['sets'] as &$set) {
                        for ($j = 0; $j < sizeof($set); $j++) {
                            $set[$j] = $set[$j]->getId();
                        }
                    }
                }
            }
            $result[$sessions[$i]->getId()]['exercices'] = $exercices;
        }
        return $this->json($result);
    }

    #[Route(path:'/set', name: 'set')]
    public function set(SetRepository $setRepository) {
        $sets = $setRepository->findBy($_GET);
        $result = array();
        for ($i = 0; $i < sizeof($sets); $i++) {
            $result[$sets[$i]->getId()]['id'] = $sets[$i]->getId();
            $result[$sets[$i]->getId()]['session'] = $sets[$i]->getSession()->getId();
            $result[$sets[$i]->getId()]['equipment'] = $sets[$i]->getEquipment();
            $result[$sets[$i]->getId()]['symmetry'] = $sets[$i]->getSymmetry();
            $result[$sets[$i]->getId()]['repetitions'] = $sets[$i]->getRepetitions();
            $result[$sets[$i]->getId()]['weight'] = $sets[$i]->getWeight();
            $result[$sets[$i]->getId()]['concentric'] = $sets[$i]->getConcentric();
            $result[$sets[$i]->getId()]['isometric'] = $sets[$i]->getIsometric();
            $result[$sets[$i]->getId()]['eccentric'] = $sets[$i]->getEccentric();
            $result[$sets[$i]->getId()]['dropping'] = $sets[$i]->isDropping();
        }
        return $this->json($result);
    }

    #[Route(path:'/quotation', name: 'quotation')]
    public function quotation(QuotationRepository $quotationRepository) {
        $quotations = $quotationRepository->findBy($_GET);
        $result = array();
        for ($i = 0; $i < sizeof($quotations); $i++) {
            $result[$quotations[$i]->getId()]['id'] = $quotations[$i]->getId();
            $result[$quotations[$i]->getId()]['text'] = $quotations[$i]->getText();
            $result[$quotations[$i]->getId()]['author'] = $quotations[$i]->getAuthor();
        }
        return $this->json($result);
    }
}
