<?php

namespace App\Repository\Training;

use App\Entity\Training\Exercice;
use App\Entity\Training\Set;
use DateInterval;
use DateTime;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Set>
 *
 * @method Set|null find($id, $lockMode = null, $lockVersion = null)
 * @method Set|null findOneBy(array $criteria, array $orderBy = null)
 * @method Set[]    findAll()
 * @method Set[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class SetRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Set::class);
    }

    public function save(Set $entity, bool $flush = false): void
    {
        $this->getEntityManager()->persist($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    public function remove(Set $entity, bool $flush = false): void
    {
        $this->getEntityManager()->remove($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    /**
     * @return Set[] Returns an array of Set objects
     */
    public function findTheBest(Exercice $exercice, string $equipment, string $symmetry): ?Set
    {
        $limit = new DateTime();
        $limit->sub(new DateInterval('P21D'));
        return $this->createQueryBuilder('s')
            ->andWhere('s.exercice = :exercice')
            ->andWhere('s.equipment = :equipment')
            ->andWhere('s.symmetry = :symmetry')
            //->andWhere('s.date >= :limit')
            ->andWhere('s.weight <> 0')
            ->setParameter('exercice', $exercice)
            ->setParameter('equipment', $equipment)
            ->setParameter('symmetry', $symmetry)
            //->setParameter('limit', $limit)
            ->orderBy('s.score', 'DESC')
            ->setMaxResults(1)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }

//    /**
//     * @return Set[] Returns an array of Set objects
//     */
//    public function findByExampleField($value): array
//    {
//        return $this->createQueryBuilder('s')
//            ->andWhere('s.exampleField = :val')
//            ->setParameter('val', $value)
//            ->orderBy('s.id', 'ASC')
//            ->setMaxResults(10)
//            ->getQuery()
//            ->getResult()
//        ;
//    }

//    public function findOneBySomeField($value): ?Set
//    {
//        return $this->createQueryBuilder('s')
//            ->andWhere('s.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
