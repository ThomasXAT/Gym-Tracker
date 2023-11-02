<?php

namespace App\Repository\Training;

use App\Entity\Athlete;
use App\Entity\Training\Exercice;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Exercice>
 *
 * @method Exercice|null find($id, $lockMode = null, $lockVersion = null)
 * @method Exercice|null findOneBy(array $criteria, array $orderBy = null)
 * @method Exercice[]    findAll()
 * @method Exercice[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class ExerciceRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Exercice::class);
    }

    public function save(Exercice $entity, bool $flush = false): void
    {
        $this->getEntityManager()->persist($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    public function remove(Exercice $entity, bool $flush = false): void
    {
        $this->getEntityManager()->remove($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    /**
     * @return Exercice[] Returns an array of Exercice objects
     */
    public function findBySearch(Athlete $athlete, string $search, string $equipment = null): array
    {
        $exercices = $this->createQueryBuilder('e')
            ->andWhere('e.athlete = :athlete')
            ->andWhere('e.name LIKE :search')
            ->setParameter('athlete', $athlete)
            ->setParameter('search', '%' . $search . '%')
            ->getQuery()
            ->getResult()
        ;
        if ($equipment) {
            $toDelete = array();
            for ($i = 0; $i < sizeof($exercices); $i++) {
                if (!in_array($equipment, $exercices[$i]->getEquipments())) {
                    array_push($toDelete, $i);
                }
            }
            foreach ($toDelete as $key) {
                unset($exercices[$key]);
            }
        }
        return $exercices;
    }

//    /**
//     * @return Exercice[] Returns an array of Exercice objects
//     */
//    public function findByExampleField($value): array
//    {
//        return $this->createQueryBuilder('e')
//            ->andWhere('e.exampleField = :val')
//            ->setParameter('val', $value)
//            ->orderBy('e.id', 'ASC')
//            ->setMaxResults(10)
//            ->getQuery()
//            ->getResult()
//        ;
//    }

//    public function findOneBySomeField($value): ?Exercice
//    {
//        return $this->createQueryBuilder('e')
//            ->andWhere('e.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
