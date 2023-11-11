<?php

namespace App\Controller;

use App\Entity\Athlete;
use App\Entity\Training\Sequence;
use App\Entity\Training\Session;
use App\Entity\Training\Set;
use App\Repository\Training\ExerciceRepository;
use App\Repository\Training\SequenceRepository;
use App\Repository\Training\SessionRepository;
use App\Repository\Training\SetRepository;
use DateTime;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\RequestStack;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

#[Route(path: '/session', name: 'session_')]
class SessionController extends AbstractController
{
    private RequestStack $requestStack;

    function __construct(RequestStack $requestStack) {
        $this->requestStack = $requestStack;
    }

    #[Route(path:'/start', name: 'start')]
    public function start(SessionRepository $sessionRepository): Response
    {
        /**
         * @var Athlete $user
         */
        $user = $this->getUser();
        $data = $_POST;
        if (isset($data['title']) && !$sessionRepository->findOneBy(['athlete' => $user, 'current' => true])) {
            $session = new Session();
            $session
                ->setTitle($data['title'])
                ->setString(uniqid())
                ->setAthlete($user)
                ->setStart(new DateTime())
            ;
            $sessionRepository->save($session, true);
        }
        return $this->redirectToRoute('home');
    }

    #[Route(path:'/title/edit', name: 'title_edit')]
    public function title_edit(SessionRepository $sessionRepository): Response
    {
        $data = $_POST;
        if (isset($data['id']) && isset($data['title']) && $session = $sessionRepository->findOneBy(['id' => $data['id']])) {
            if ($session->getAthlete() === $this->getUser() && strlen($data['title']) > 0 && strlen($data['title']) <= 64) {
                $session->setTitle($data['title']);
                $sessionRepository->save($session, true);
            }
        }
        return $this->json($data);
    }

    #[Route(path:'/stop', name: 'stop')]
    public function stop(SessionRepository $sessionRepository, SequenceRepository $sequenceRepository, SetRepository $setRepository): Response
    {
        /**
         * @var Athlete $user
         */
        $user = $this->getUser();
        if ($session = $sessionRepository->findOneBy(['athlete' => $user, 'current' => true])) {
            if (sizeof($session->getExercices())) {
                $lastSet = $setRepository->findOneBy(['session' => $session], ['date' => 'desc']);
                $session
                    ->setCurrent(false)
                    ->setEnd($lastSet->getDate())
                ;
                $sessionRepository->save($session, true);
            }
            else {
                $sequences = $sequenceRepository->findBy(['session' => $session]);
                foreach ($sequences as $sequence) {
                    $sequenceRepository->remove($sequence, true);
                }
                $sessionRepository->remove($session, true);
            }
        }
        return $this->redirectToRoute('home');
    }

    #[Route(path:'/set/edit', name: 'set_edit')]
    public function set_edit(SetRepository $setRepository): Response
    {
        $data = $_POST;
        foreach ($data['sets'] as $id => $edited) {
            $set = $setRepository->findOneBy(['id' => $id]);
            if ($this->getUser() === $set->getSession()->getAthlete()) {
                $set
                    ->setSymmetry($edited['symmetry'])
                    ->setRepetitions(isset($edited['repetitions']) && $edited['repetitions'] > 0 ? $edited['repetitions']: 0)
                    ->setWeight(isset($edited['weight']) && $edited['weight'] > 0 ? ($set->getSession()->getAthlete()->getSettings()->getUnit() === 'lbs' ? $edited['weight'] * 0.45359237: $edited['weight']): 0)
                    ->setConcentric(isset($edited['concentric']) && $edited['concentric'] > 1 ? $edited['concentric']: 1)
                    ->setIsometric(isset($edited['isometric']) && $edited['isometric'] > 1 ? $edited['isometric']: 1)
                    ->setEccentric(isset($edited['eccentric']) && $edited['eccentric'] > 1 ? $edited['eccentric']: 1)
                ;
                $setRepository->save($set, true);
            }
        }
        return $this->json($data);
    }

    #[Route(path:'/set/add', name: 'set_add')]
    public function set_add(SessionRepository $sessionRepository, SequenceRepository $sequenceRepository, ExerciceRepository $exerciceRepository, SetRepository $setRepository): Response
    {
        /**
         * @var Athlete $user
         */
        $user = $this->getUser();
        $data = $_POST;
        if ($user->isWorkingOut()) {
            $session = $sessionRepository->findOneBy(['athlete' => $user, 'current' => true]);
            $exercices = $session->getExercices();
            if ($lastExercice = sizeof($exercices) ? end($exercices): false) {
                $lastExercice['identifier'] = "";
                if ($lastExercice['sequence']) {
                    foreach ($lastExercice['exercices'] as $lastExercicePart) {
                        $lastExercice['identifier'] .= $lastExercicePart['id'] . '(' . $lastExercicePart['equipment'] . ')+';
                    }
                    $lastExercice['identifier'] = substr($lastExercice['identifier'], 0, -1);
                }
                else {
                    $lastExercice['identifier'] .= $lastExercice['id'] . '(' . $lastExercice['equipment'] . ')';
                }
            }
            if ($data['size'] > 1) {
                if ($lastExercice && $data['identifier'] === $lastExercice['identifier']) {
                    $sequences = $sequenceRepository->findBy(['session' => $session]);
                    $sequence = end($sequences);
                }
                else {
                    $sequence = new Sequence();
                    $sequence->setSession($session);
                    $sequence->setSize($data['size']);
                    $sequenceRepository->save($sequence, true);
                }
            }
            foreach ($data['sets'] as $created) {
                $exercice = $exerciceRepository->findOneBy(['id' => $created['exercice']]);
                $set = new Set();
                $set
                    ->setSession($session)
                    ->setSequence(isset($sequence) ? $sequence: null)
                    ->setExercice($exercice)
                    ->setEquipment($created['equipment'])
                    ->setSymmetry($created['symmetry'])
                    ->setRepetitions(isset($created['repetitions']) && $created['repetitions'] > 0 ? $created['repetitions']: 0)
                    ->setWeight(isset($created['weight']) && $created['weight'] > 0 ? ($session->getAthlete()->getSettings()->getUnit() === 'lbs' ? $created['weight'] * 0.45359237: $created['weight']): 0)
                    ->setConcentric(isset($created['concentric']) && $created['concentric'] > 1 ? $created['concentric']: 1)
                    ->setIsometric(isset($created['isometric']) && $created['isometric'] > 1 ? $created['isometric']: 1)
                    ->setEccentric(isset($created['eccentric']) && $created['eccentric'] > 1 ? $created['eccentric']: 1)
                    ->setDropping($created['dropping'] === 'true')
                    ->setDate(new DateTime())
                ;
                $setRepository->save($set, true);
            }
        }
        $exercices = json_decode(file_get_contents($this->requestStack->getCurrentRequest()->getSchemeAndHttpHost() . '/api/session'), true)[$session->getId()]['exercices'];
        $sets = json_decode(file_get_contents($this->requestStack->getCurrentRequest()->getSchemeAndHttpHost() . '/api/set?session=' . $session->getId()), true);
        $data['new'] = !$lastExercice || $data['identifier'] !== $lastExercice['identifier'] ? true: false;
        $data['last'] = end($exercices);
        $data['sets'] = $sets;
        return $this->json($data);
    }

    #[Route(path:'/set/delete', name: 'set_delete')]
    public function set_delete(SessionRepository $sessionRepository, SequenceRepository $sequenceRepository, SetRepository $setRepository): Response
    {
        /**
         * @var Athlete $user
         */
        $user = $this->getUser();
        if ($user->isWorkingOut()) {
            $session = $sessionRepository->findOneBy(['athlete' => $user, 'current' => true]);
            $exercices = $session->getExercices();
            if ($exerciceIndex = sizeof($exercices)) {
                $exercice = end($exercices);
                $setIndex = sizeof($exercice['sequence'] ? $exercice['exercices'][0]['sets']: $exercice['sets']);
                if ($exercice['sequence']) {
                    $result = array();
                    for ($i = 0; $i < sizeof($exercice['exercices']); $i++) {
                        $exercicePartIndex = $i + 1;
                        array_push($result, 'exercice-' . $exerciceIndex . '-part-' . $exercicePartIndex . '-set-' . $setIndex);
                        foreach ($exercice['exercices'] as $exercicePart) {
                            foreach ($exercicePart['sets'][$setIndex - 1] as $setPart) {
                                $setRepository->remove($setPart, true);
                            }
                        }
                    }
                    if ($setIndex === 1) {
                        $sequenceRepository->remove($sequenceRepository->findOneBy(['id' => $exercice['id']]), true);
                    }
                }
                else {
                    $result = ['exercice-' . $exerciceIndex . '-set-' . $setIndex];
                    foreach($exercice['sets'][$setIndex - 1] as $setPart) {
                        $setRepository->remove($setPart, true);
                    }
                }
            }
        }
        return $this->json(isset($setIndex) && $setIndex === 1 ? ['exercice-' . $exerciceIndex]: $result);
    }
    
    #[Route(path:'/exercice/search', name: 'exercice_search')]
    public function exercice_search(ExerciceRepository $exerciceRepository): Response
    {
        $data = $_POST;
        $search = isset($data['search']) ? $data['search']: null;
        $equipment = isset($data['equipment']) ? $data['equipment']: null;
        $result = array();
        foreach ($exerciceRepository->findBySearch($this->getUser(), $search, $equipment) as $exercice) {
            $result[$exercice->getId()] = ['id' => $exercice->getId(), 'name' => $exercice->getName(), 'equipments' => $exercice->getEquipments()];
        }
        return $this->json($result);
    }

    #[Route(path:'/delete/{id}', name: 'delete')]
    public function delete(Session $session, SessionRepository $sessionRepository, SetRepository $setRepository, SequenceRepository $sequenceRepository): Response
    {
        if ($this->getUser() === $session->getAthlete()) {
            $sets = $session->getSets();
            foreach ($sets as $set) {
                $setRepository->remove($set, true);
            }
            $sequences = $session->getSequences();
            foreach ($sequences as $sequence) {
                $sequenceRepository->remove($sequence, true);
            }
            $sessionRepository->remove($session, true);
            return $this->redirectToRoute('sessions', ['username' => $session->getAthlete()->getUsername()]);
        }
        return $this->redirectToRoute('home');
    }
}