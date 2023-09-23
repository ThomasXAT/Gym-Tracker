<?php

namespace App\Entity\Training;

use App\Entity\Biomechanics\Movement;
use App\Repository\Training\ExerciceRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: ExerciceRepository::class)]
class Exercice
{
    const DECLINE = 'decline';
    const FLAT = 'flat';
    const INCLINE = 'incline';
    const SEATED = 'seated';
    const STANDING = 'standing';
    const PREACHER = 'preacher';
    const INCLINATIONS = [
        'Décliné' => self::DECLINE,
        'Couché' => self::FLAT,
        'Incliné' => self::INCLINE,
        'Assis' => self::SEATED,
        'Debout' => self::STANDING,
        'Pupitre' => self::PREACHER,
    ];

    const BODYWEIGHT = 'bodyweight';
    const BAND = 'band';
    const BARBELL = 'barbell';
    const DUMBBELL = 'dumbbell';
    const CABLE = 'cable';
    const SMITH = 'smith';
    const MACHINE = 'machine';
    const EQUIPMENTS = [
        'poids du corps' => self::BODYWEIGHT,
        'élastique' => self::BAND,
        'barre' => self::BARBELL,
        'haltères' => self::DUMBBELL,
        'poulie' => self::CABLE,
        'barre guidée' => self::SMITH,
        'machine' => self::MACHINE,
    ];

    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $name = null;

    #[ORM\ManyToMany(targetEntity: Movement::class, inversedBy: 'exercices')]
    private Collection $movements;

    #[ORM\OneToMany(mappedBy: 'exercice', targetEntity: Set::class)]
    private Collection $sets;

    #[ORM\Column(type: Types::ARRAY, nullable: true)]
    private array $equipments = [];

    public function __construct()
    {
        $this->movements = new ArrayCollection();
        $this->sets = new ArrayCollection();
    }
    
    public function __toString()
    {
        return $this->getName();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    /**
     * @return Collection<int, Movement>
     */
    public function getMovements(): Collection
    {
        return $this->movements;
    }

    public function addMovement(Movement $movement): self
    {
        if (!$this->movements->contains($movement)) {
            $this->movements->add($movement);
        }

        return $this;
    }

    public function removeMovement(Movement $movement): self
    {
        $this->movements->removeElement($movement);

        return $this;
    }

    /**
     * @return Collection<int, Set>
     */
    public function getSets(): Collection
    {
        return $this->sets;
    }

    public function addSet(Set $set): self
    {
        if (!$this->sets->contains($set)) {
            $this->sets->add($set);
            $set->setExercice($this);
        }

        return $this;
    }

    public function removeSet(Set $set): self
    {
        if ($this->sets->removeElement($set)) {
            // set the owning side to null (unless already changed)
            if ($set->getExercice() === $this) {
                $set->setExercice(null);
            }
        }

        return $this;
    }

    public function getEquipments(): array
    {
        return $this->equipments;
    }

    public function setEquipments(?array $equipments): self
    {
        $this->equipments = $equipments;

        return $this;
    }
}
