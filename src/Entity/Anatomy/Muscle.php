<?php

namespace App\Entity\Anatomy;

use App\Entity\Biomechanics\Movement;
use App\Repository\Anatomy\MuscleRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: MuscleRepository::class)]
class Muscle
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $name = null;

    #[ORM\OneToMany(mappedBy: 'muscle', targetEntity: Bundle::class)]
    private Collection $bundles;

    #[ORM\ManyToOne(inversedBy: 'muscles', targetEntity: "MuscleGroup", cascade: ["persist"])]
    private ?MuscleGroup $muscleGroup = null;

    #[ORM\ManyToMany(targetEntity: Movement::class, mappedBy: 'Muscles')]
    private Collection $movements;

    public function __construct()
    {
        $this->bundles = new ArrayCollection();
        $this->movements = new ArrayCollection();
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
     * @return Collection<int, Bundle>
     */
    public function getBundles(): Collection
    {
        return $this->bundles;
    }

    public function addBundle(Bundle $bundle): self
    {
        if (!$this->bundles->contains($bundle)) {
            $this->bundles->add($bundle);
            $bundle->setMuscle($this);
        }

        return $this;
    }

    public function removeBundle(Bundle $bundle): self
    {
        if ($this->bundles->removeElement($bundle)) {
            // set the owning side to null (unless already changed)
            if ($bundle->getMuscle() === $this) {
                $bundle->setMuscle(null);
            }
        }

        return $this;
    }

    public function getMuscleGroup(): ?MuscleGroup
    {
        return $this->muscleGroup;
    }

    public function setMuscleGroup(?MuscleGroup $muscleGroup): self
    {
        $this->muscleGroup = $muscleGroup;

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
            $movement->addMuscle($this);
        }

        return $this;
    }

    public function removeMovement(Movement $movement): self
    {
        if ($this->movements->removeElement($movement)) {
            $movement->removeMuscle($this);
        }

        return $this;
    }
}
