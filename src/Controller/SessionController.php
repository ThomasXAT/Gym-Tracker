<?php

namespace App\Controller;

use App\Entity\Athlete;
use App\Entity\Settings;
use App\Entity\Training\Sequence;
use App\Entity\Training\Session;
use App\Entity\Training\Set;
use App\Repository\Training\ExerciceRepository;
use App\Repository\Training\SequenceRepository;
use App\Repository\Training\SessionRepository;
use App\Repository\Training\SetRepository;
use DateTime;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\RequestStack;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

#[Route(path: '/session', name: 'session_', methods: ['POST'])]
class SessionController extends AbstractController
{
    private RequestStack $requestStack;

    function __construct(RequestStack $requestStack) {
        $this->requestStack = $requestStack;
    }

    #[Route(path:'/start', name: 'start')]
    public function start(Request $request, SessionRepository $sessionRepository): Response
    {
        /**
         * @var Athlete $user
         */
        $user = $this->getUser();
        $title = $request->get('title');
        if ($title && !$sessionRepository->findOneBy(['athlete' => $user, 'current' => true])) {
            $session = new Session();
            $session
                ->setTitle($title)
                ->setString(uniqid())
                ->setAthlete($user)
                ->setStart(new DateTime())
            ;
            $sessionRepository->save($session, true);
        }
        return $this->redirectToRoute('home');
    }

    #[Route(path:'/title/edit', name: 'title_edit')]
    public function title_edit(Request $request, SessionRepository $sessionRepository): Response
    {
        $id = $request->get('id');
        $title = $request->get('title');
        if ($id && $title && $session = $sessionRepository->findOneBy(['id' => $id])) {
            if ($session->getAthlete() === $this->getUser() && strlen($title) > 0 && strlen($title) <= 64) {
                $session->setTitle($title);
                $sessionRepository->save($session, true);
            }
        }
        return $this->json(true);
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
                $this->addFlash('success', 'notifier.session.stop.success');
            }
            else {
                $sequences = $sequenceRepository->findBy(['session' => $session]);
                foreach ($sequences as $sequence) {
                    $sequenceRepository->remove($sequence, true);
                }
                $sessionRepository->remove($session, true);
                $this->addFlash('error', 'notifier.session.stop.error');
            }
        }
        else {
            $this->addFlash('error', 'notifier.session.stop.error');
        }
        return $this->redirectToRoute('home');
    }

    #[Route(path:'/set/edit', name: 'set_edit')]
    public function set_edit(Request $request, SetRepository $setRepository): Response
    {
        $sets = $request->get('sets');
        foreach ($sets as $id => $edited) {
            $set = $setRepository->findOneBy(['id' => $id]);
            if ($this->getUser() === $set->getSession()->getAthlete()) {
                $set
                    ->setSymmetry($edited['symmetry'])
                    ->setRepetitions(isset($edited['repetitions']) && $edited['repetitions'] > 0 ? $edited['repetitions']: 0)
                    ->setWeight(isset($edited['weight']) && $edited['weight'] > 0 ? ($set->getSession()->getAthlete()->getSettings()->getUnit() === Settings::LBS ? $edited['weight'] * Settings::LBS_TO_KG_MULTIPLIER: $edited['weight']): 0)
                    ->setConcentric(isset($edited['concentric']) && $edited['concentric'] > 1 ? $edited['concentric']: 1)
                    ->setIsometric(isset($edited['isometric']) && $edited['isometric'] > 1 ? $edited['isometric']: 1)
                    ->setEccentric(isset($edited['eccentric']) && $edited['eccentric'] > 1 ? $edited['eccentric']: 1)
                ;
                $set->updateScore();
                $setRepository->save($set, true);
            }
        }
        return $this->json($sets);
    }

    #[Route(path:'/set/add', name: 'set_add')]
    public function set_add(Request $request, SessionRepository $sessionRepository, SequenceRepository $sequenceRepository, ExerciceRepository $exerciceRepository, SetRepository $setRepository): Response
    {
        /**
         * @var Athlete $user
         */
        $user = $this->getUser();
        $size = $request->get('size');
        $identifier = $request->get('identifier');
        $sets = $request->get('sets');
        $data["performance"] = false;
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
            if ($size > 1) {
                if ($lastExercice && $identifier === $lastExercice['identifier']) {
                    $sequences = $sequenceRepository->findBy(['session' => $session]);
                    $sequence = end($sequences);
                }
                else {
                    $sequence = new Sequence();
                    $sequence->setSession($session);
                    $sequence->setSize($size);
                    $sequenceRepository->save($sequence, true);
                }
            }
            foreach ($sets as $created) {
                $exercice = $exerciceRepository->findOneBy(['id' => $created['exercice']]);
                /**
                 * @var ?Set $best
                 */
                $best = $setRepository->findTheBest($exercice, $created['equipment'], $created['symmetry']);
                $set = new Set();
                $set
                    ->setSession($session)
                    ->setSequence(isset($sequence) ? $sequence: null)
                    ->setExercice($exercice)
                    ->setEquipment($created['equipment'])
                    ->setSymmetry($created['symmetry'])
                    ->setRepetitions(isset($created['repetitions']) && $created['repetitions'] > 0 ? $created['repetitions']: 0)
                    ->setWeight(isset($created['weight']) && $created['weight'] > 0 ? ($session->getAthlete()->getSettings()->getUnit() === Settings::LBS ? $created['weight'] * Settings::LBS_TO_KG_MULTIPLIER: $created['weight']): 0)
                    ->setConcentric(isset($created['concentric']) && $created['concentric'] > 1 ? $created['concentric']: 1)
                    ->setIsometric(isset($created['isometric']) && $created['isometric'] > 1 ? $created['isometric']: 1)
                    ->setEccentric(isset($created['eccentric']) && $created['eccentric'] > 1 ? $created['eccentric']: 1)
                    ->setDropping($created['dropping'] === 'true')
                    ->setDate(new DateTime())
                    ->updateScore()
                ;
                $setRepository->save($set, true);
                if (!$best || $set->getScore() > $best->getScore()) {
                    $data["performance"] = true;
                }
            }
        }
        $exercices = json_decode(file_get_contents($this->requestStack->getCurrentRequest()->getSchemeAndHttpHost() . '/api/session'), true)[$session->getId()]['exercices'];
        $sets = json_decode(file_get_contents($this->requestStack->getCurrentRequest()->getSchemeAndHttpHost() . '/api/set?session=' . $session->getId()), true);
        $data['new'] = !$lastExercice || $identifier !== $lastExercice['identifier'];
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

    #[Route(path:'/delete/{id}', name: 'delete')]
    public function delete(Session $session, SessionRepository $sessionRepository, SetRepository $setRepository, SequenceRepository $sequenceRepository): Response
    {
        $athlete = $session->getAthlete();
        if ($this->getUser() === $athlete) {
            $sets = $session->getSets();
            foreach ($sets as $set) {
                $setRepository->remove($set, true);
            }
            $sequences = $session->getSequences();
            foreach ($sequences as $sequence) {
                $sequenceRepository->remove($sequence, true);
            }
            $sessionRepository->remove($session, true);
            $this->addFlash('success', 'notifier.session.delete.success');
            if ($sessionRepository->findAll(['athlete' => $athlete])) {
                return $this->redirectToRoute('sessions', ['username' => $athlete->getUsername()]);
            }
            else {
                return $this->redirectToRoute('profile', ['username' => $athlete->getUsername()]);
            }
        }
        return $this->redirectToRoute('home');
    }

    #[Route(path:'/objective', name: 'objective')]
    public function objective(Request $request, SessionRepository $sessionRepository, SetRepository $setRepository, ExerciceRepository $exerciceRepository) {
        $objective = array();
        if ($exercices = $request->get('sets')) {
            /**
             * @var Athlete $user
             */
            $user = $this->getUser();
            if ($user->isWorkingOut()) {
                $session = $sessionRepository->findOneBy(['athlete' => $user, 'current' => true]);
                $setIndex = 1;
                if ($sessionExercices = $session->getExercices()) {
                    $lastExercice = end($sessionExercices);
                    $lastExerciceIds = $lastExercice['sequence'] ? array(): [$lastExercice['id']];
                    $currentExerciceIds = array();
                    if ($lastExercice['sequence']) {
                        foreach ($lastExercice['exercices'] as $exercice) {
                            array_push($lastExerciceIds, $exercice['id']);
                        }
                    }
                    foreach ($exercices as $exercice) {
                        if ($exercice['dropping'] !== 'true') {
                            array_push($currentExerciceIds, (int)$exercice['exercice']);
                        }
                    }
                    if ($lastExerciceIds === $currentExerciceIds) {
                        $setIndex = sizeof($lastExercice['sequence'] ? $lastExercice['exercices']['0']['sets']: $lastExercice['sets']) + 1;
                    }
                }
                foreach ($exercices as $exercice) {
                    if ($exercice['dropping'] !== 'true') {
                        $exerciceObject = $exerciceRepository->findOneBy(['id' => $exercice['exercice']]);
                        $equipment = $exercice['equipment'];
                        $symmetry = $exercice['symmetry'];
                        if ($last = $setRepository->findOneBy(['exercice' => $exerciceObject, 'dropping' => false], ['date' => 'desc'])) {
                            /**
                             * @var ?Set $best
                             */
                            $best = $setRepository->findTheBest($exerciceObject, $equipment, $symmetry);
                        }
                        if ($last && $best) {
                            $repetitions = (
                                $best->getRepetitions() < 12 ?
                                $best->getRepetitions() + 1:
                                $best->getRepetitions() % 4 + 8
                            );
                            $weight = (
                                $best->getRepetitions() < 12 ?
                                $best->getWeight():
                                $best->getWeight()
                                    + (intdiv($best->getRepetitions(), 4) - 2)
                                    * ($best->getSymmetry() === Set::UNILATERAL ? 1: 2)
                                    * (1 + $best->getWeight() / 100)
                            );
                            $concentric = $best->getConcentric();
                            $isometric = $best->getIsometric();
                            $eccentric = $best->getEccentric();
                            switch ($setIndex) {
                                case 1:
                                    $reducer = 0.6;
                                    break;
                                case 2:
                                    $currentSet = new Set();
                                    $currentSet
                                        ->setSymmetry($symmetry)
                                        ->setRepetitions(10)
                                        ->setWeight($weight * 0.8)
                                        ->setConcentric($concentric)
                                        ->setIsometric($isometric)
                                        ->setEccentric($eccentric)
                                        ->updateScore()
                                    ;
                                    $reducer = $currentSet->getScore() > $session->getSets()->last()->getScore() ? 0.8: 1;
                                    break;
                                default:
                                    $reducer = 1;
                                    break;
                            }
                        }
                        array_push(
                            $objective, 
                            $last && $best ?
                            [
                                'objective' => true,
                                'name' => $best->getExercice()->getName(),
                                'equipment' => $best->getEquipment(),
                                'symmetry' => $symmetry,
                                'repetitions' => $reducer === 1 ? $repetitions: ($reducer === 0.8 ? intdiv(10 + $repetitions, 2): 10),
                                'weight' => $weight * $reducer,
                                'concentric' => $concentric,
                                'isometric' => $isometric,
                                'eccentric' => $eccentric,
                            ]:
                            [
                                'objective' => false,
                                'name' => $exerciceObject->getName(),
                                'equipment' => $exercice['equipment'],
                            ]
                        );
                    }
                }       
            }
        }
        return $this->json($objective);
    }
}