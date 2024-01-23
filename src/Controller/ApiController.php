<?php

namespace App\Controller;

use App\Entity\Training\Set;
use App\Repository\AthleteRepository;
use App\Repository\Training\ExerciceRepository;
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
            $id = $athletes[$i]->getId();
            $result[$id]['id'] = $athletes[$i]->getId();
            $result[$id]['username'] = $athletes[$i]->getUsername();
            $result[$id]['firstname'] = $athletes[$i]->getFirstname();
            $result[$id]['surname'] = $athletes[$i]->getSurname();
            $result[$id]['picture'] = $athletes[$i]->getPicture();
            if ($athletes[$i]->getSettings()->isMeasurement()) {
                $result[$id]['height'] = $athletes[$i]->getHeight();
                $result[$id]['weight'] = $athletes[$i]->getWeight();
            }
            $result[$id]['description'] = $athletes[$i]->getDescription();
        }
        return $this->json($result);
    }

    #[Route(path:'/session', name: 'session')]
    public function session(SessionRepository $sessionRepository) {
        $sessions = $sessionRepository->findBy($_GET);
        $result = array();
        for ($i = 0; $i < sizeof($sessions); $i++) {
            $id = $sessions[$i]->getId();
            $result[$id]['id'] = $sessions[$i]->getId();
            $result[$id]['title'] = $sessions[$i]->getTitle();
            $result[$id]['subtitle'] = $sessions[$i]->getSubtitle();
            $result[$id]['athlete'] = $sessions[$i]->getAthlete()->getId();
            $result[$id]['current'] = $sessions[$i]->isCurrent();
            $result[$id]['start'] = $sessions[$i]->getStart();
            $result[$id]['end'] = $sessions[$i]->getEnd();
            $result[$id]['string'] = $sessions[$i]->getString();
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
            $result[$id]['exercices'] = $exercices;
        }
        return $this->json($result);
    }

    #[Route(path:'/set', name: 'set')]
    public function set(SetRepository $setRepository) {
        $sets = $setRepository->findBy($_GET);
        $result = array();
        for ($i = 0; $i < sizeof($sets); $i++) {
            $id = $sets[$i]->getId();
            $result[$id]['id'] = $sets[$i]->getId();
            $result[$id]['exercice'] = $sets[$i]->getExercice()->getId();
            $result[$id]['sequence'] = $sets[$i]->getSequence() ? $sets[$i]->getSequence()->getId(): null;
            $result[$id]['session'] = $sets[$i]->getSession()->getId();
            $result[$id]['equipment'] = $sets[$i]->getEquipment();
            $result[$id]['symmetry'] = $sets[$i]->getSymmetry();
            $result[$id]['repetitions'] = $sets[$i]->getRepetitions();
            $result[$id]['weight'] = $sets[$i]->getWeight();
            $result[$id]['concentric'] = $sets[$i]->getConcentric();
            $result[$id]['isometric'] = $sets[$i]->getIsometric();
            $result[$id]['eccentric'] = $sets[$i]->getEccentric();
            $result[$id]['dropping'] = $sets[$i]->isDropping();
            $result[$id]['date'] = $sets[$i]->getDate();
            $result[$id]['score'] = $sets[$i]->getScore();

        }
        return $this->json($result);
    }

    #[Route(path:'/exercice', name: 'exercice')]
    public function exercice(ExerciceRepository $exerciceRepository, SetRepository $setRepository) {
        $exercices = $exerciceRepository->findBy($_GET);
        $result = array();
        for ($i = 0; $i < sizeof($exercices); $i++) {
            $lastSet = $setRepository->findOneBy(['exercice' => $exercices[$i], 'dropping' => false], ['date' => 'desc']);
            $id = $exercices[$i]->getId();
            $result[$id]['id'] = $exercices[$i]->getId();
            $result[$id]['name'] = $exercices[$i]->getName();
            $result[$id]['equipments'] = $exercices[$i]->getEquipments();
            $result[$id]['athlete'] = $exercices[$i]->getAthlete()->getId();
            $result[$id]['symmetry'] = $lastSet ? $lastSet->getSymmetry(): Set::BILATERAL;
        }
        return $this->json($result);
    }
}
