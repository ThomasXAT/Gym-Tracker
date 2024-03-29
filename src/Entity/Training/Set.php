<?php

namespace App\Entity\Training;

use App\Repository\Training\SetRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: SetRepository::class)]
#[ORM\Table(name: '`set`')]
class Set
{
    const UNILATERAL = 'unilateral';
    const BILATERAL = 'bilateral';
    const SYMMETRY = [
        self::UNILATERAL,
        self::BILATERAL,
    ];

    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\ManyToOne(inversedBy: 'sets')]
    private ?Exercice $exercice = null;

    #[ORM\Column(length: 255)]
    private ?string $equipment = null;

    #[ORM\Column(length: 255)]
    private ?string $symmetry = null;

    #[ORM\Column]
    private ?int $repetitions = null;

    #[ORM\Column]
    private ?float $weight = null;

    #[ORM\Column(nullable: true)]
    private ?float $concentric = null;

    #[ORM\Column(nullable: true)]
    private ?float $isometric = null;

    #[ORM\Column(nullable: true)]
    private ?float $eccentric = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE)]
    private ?\DateTimeInterface $date = null;

    #[ORM\ManyToOne(inversedBy: 'sets')]
    private ?Session $session = null;

    #[ORM\ManyToOne(inversedBy: 'sets')]
    private ?Sequence $sequence = null;

    #[ORM\Column]
    private ?bool $dropping = null;

    #[ORM\Column(nullable: true)]
    private ?float $score = null;

    public function __toString()
    {
        return $this->getExercice()->__toString() . ' ' . $this->getEquipment() . ' ' . $this->getSymmetry() . ' (' . $this->getRepetitions() . 'x' . $this->getWeight() . ')';
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getExercice(): ?Exercice
    {
        return $this->exercice;
    }

    public function setExercice(?Exercice $exercice): self
    {
        $this->exercice = $exercice;

        return $this;
    }

    public function getEquipment(): ?string
    {
        return $this->equipment;
    }

    public function setEquipment(string $equipment): self
    {
        $this->equipment = $equipment;

        return $this;
    }

    public function getSymmetry(): ?string
    {
        return $this->symmetry;
    }

    public function setSymmetry(string $symmetry): self
    {
        $this->symmetry = $symmetry;

        return $this;
    }

    public function getRepetitions(): ?int
    {
        return $this->repetitions;
    }

    public function setRepetitions(int $repetitions): self
    {
        $this->repetitions = $repetitions;

        return $this;
    }

    public function getWeight(): ?float
    {
        return $this->weight;
    }

    public function setWeight(float $weight): self
    {
        $this->weight = $weight;

        return $this;
    }

    public function getConcentric(): ?float
    {
        return $this->concentric;
    }

    public function setConcentric(float $concentric): self
    {
        $this->concentric = $concentric;

        return $this;
    }

    public function getIsometric(): ?float
    {
        return $this->isometric;
    }

    public function setIsometric(float $isometric): self
    {
        $this->isometric = $isometric;

        return $this;
    }

    public function getEccentric(): ?float
    {
        return $this->eccentric;
    }

    public function setEccentric(float $eccentric): self
    {
        $this->eccentric = $eccentric;

        return $this;
    }
    
    public function getDate(): ?\DateTimeInterface
    {
        return $this->date;
    }

    public function setDate(\DateTimeInterface $date): self
    {
        $this->date = $date;

        return $this;
    }

    public function getSession(): ?Session
    {
        return $this->session;
    }

    public function setSession(?Session $session): self
    {
        $this->session = $session;

        return $this;
    }

    public function getSequence(): ?Sequence
    {
        return $this->sequence;
    }

    public function setSequence(?Sequence $sequence): self
    {
        $this->sequence = $sequence;

        return $this;
    }

    public function isDropping(): ?bool
    {
        return $this->dropping;
    }

    public function setDropping(bool $dropping): self
    {
        $this->dropping = $dropping;

        return $this;
    }

    public function getScore(): ?float
    {
        return $this->score;
    }

    public function setScore(?float $score): self
    {
        $this->score = $score;

        return $this;
    }

    public function updateScore(): self
    {
        $this->setScore(
            $this->getRepetitions() ?
            $this->getWeight()
                / ($this->getSymmetry() === Set::BILATERAL ? 2: 1)
                + ($this->getRepetitions() - 1) / 4
                + ($this->getConcentric() - 1) * 1/5
                + ($this->getIsometric() - 1) * 1/5
                + ($this->getEccentric() - 1) * 1/5
            :
            0
        );

        return $this;
    }
}
