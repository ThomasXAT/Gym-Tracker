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
use Symfony\Component\String\Slugger\SluggerInterface;

#[Route(path: '/session', name: 'session_', methods: ['POST'])]
class SessionController extends AbstractController
{
    private RequestStack $requestStack;
    function __construct(RequestStack $requestStack) {
        $this->requestStack = $requestStack;
    }

    #[Route(path:'/start', name: 'start')]
    public function start(SessionRepository $sessionRepository, SluggerInterface $sluggerInterface): Response
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
                ->setSlug($sluggerInterface->slug($data['title']) . '-' . uniqid())
                ->setAthlete($user)
                ->setStart(new DateTime)
            ;
            $sessionRepository->save($session, true);
        }
        return $this->redirectToRoute('home');
    }

    #[Route(path:'/stop', name: 'stop')]
    public function stop(SessionRepository $sessionRepository, SequenceRepository $sequenceRepository): Response
    {
        /**
         * @var Athlete $user
         */
        $user = $this->getUser();
        if ($session = $sessionRepository->findOneBy(['athlete' => $user, 'current' => true])) {
            if (sizeof($session->getExercices())) {
                $session
                    ->setCurrent(false)
                    ->setEnd(new DateTime)
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
            $set
                ->setSymmetry($edited['symmetry'])
                ->setRepetitions(isset($edited['repetitions']) && $edited['repetitions'] > 0 ? $edited['repetitions']: 0)
                ->setWeight(isset($edited['weight']) && $edited['repetitions'] > 0 ? $edited['repetitions']: 0)
                ->setConcentric(isset($edited['concentric']) && $edited['concentric'] > 1 ? $edited['concentric']: 1)
                ->setIsometric(isset($edited['isometric']) && $edited['isometric'] > 1 ? $edited['isometric']: 1)
                ->setEccentric(isset($edited['eccentric']) && $edited['eccentric'] > 1 ? $edited['eccentric']: 1)
            ;
            $setRepository->save($set, true);
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
            $lastExercice = sizeof($exercices) ? end($exercices): false;
            if ($data['size'] > 1) {
                if ($lastExercice && $data['fullname'] === $lastExercice['fullname']) {
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
                    ->setWeight(isset($created['weight']) && $created['weight'] > 0 ? $created['weight']: 0)
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
        $data['new'] = !$lastExercice || $data['fullname'] !== $lastExercice['fullname'] ? true: false;
        $data['last'] = end($exercices);
        $data['sets'] = $sets;
        return $this->json($data);
    }

    #[Route(path:'/set/delete', name: 'set_delete')]
    public function set_delete(SetRepository $setRepository): Response
    {
        $data = $_POST;
        foreach (array_keys($data['sets']) as $id) {
            $set = $setRepository->findOneBy(['id' => $id]);
            $setRepository->remove($set, true);
        }
        return $this->json($data);
    }
    
    #[Route(path:'/exercice/search', name: 'exercice_search')]
    public function exercice_search(ExerciceRepository $exerciceRepository): Response
    {
        $data = $_POST;
        $search = isset($data['search']) ? $data['search']: null;
        $equipment = isset($data['equipment']) ? $data['equipment']: null;
        $result = array();
        foreach ($exerciceRepository->findBySearch($search, $equipment) as $exercice) {
            $result[$exercice->getId()] = ['id' => $exercice->getId(), 'name' => $exercice->getName(), 'equipments' => $exercice->getEquipments()];
        }
        return $this->json($result);
    }
}