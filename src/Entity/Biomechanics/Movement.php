<?php

namespace App\Entity\Biomechanics;

use App\Entity\Anatomy\Bundle;
use App\Entity\Anatomy\Muscle;
use App\Entity\Training\Exercice;
use App\Repository\Biomechanics\MovementRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: MovementRepository::class)]
class Movement
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $name = null;

    #[ORM\ManyToMany(targetEntity: Muscle::class, inversedBy: 'movements')]
    private Collection $Muscles;

    #[ORM\ManyToMany(targetEntity: Bundle::class, inversedBy: 'movements')]
    private Collection $Bundles;

    #[ORM\ManyToMany(targetEntity: Exercice::class, mappedBy: 'movements')]
    private Collection $exercices;

    #[ORM\Column(length: 255)]
    private ?string $joint = null;

    #[ORM\Column(type: Types::TEXT, nullable: true)]
    private ?string $description = null;

    public function __construct()
    {
        $this->Muscles = new ArrayCollection();
        $this->Bundles = new ArrayCollection();
        $this->exercices = new ArrayCollection();
    }

    public function __toString()
    {
        return $this->getJoint() . " - " . $this->getDescription();
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
     * @return Collection<int, Muscle>
     */
    public function getMuscles(): Collection
    {
        return $this->Muscles;
    }

    public function addMuscle(Muscle $muscle): self
    {
        if (!$this->Muscles->contains($muscle)) {
            $this->Muscles->add($muscle);
        }

        return $this;
    }

    public function removeMuscle(Muscle $muscle): self
    {
        $this->Muscles->removeElement($muscle);

        return $this;
    }

    /**
     * @return Collection<int, Bundle>
     */
    public function getBundles(): Collection
    {
        return $this->Bundles;
    }

    public function addBundle(Bundle $bundle): self
    {
        if (!$this->Bundles->contains($bundle)) {
            $this->Bundles->add($bundle);
        }

        return $this;
    }

    public function removeBundle(Bundle $bundle): self
    {
        $this->Bundles->removeElement($bundle);

        return $this;
    }

    /**
     * @return Collection<int, Exercice>
     */
    public function getExercices(): Collection
    {
        return $this->exercices;
    }

    public function addExercice(Exercice $exercice): self
    {
        if (!$this->exercices->contains($exercice)) {
            $this->exercices->add($exercice);
            $exercice->addMovement($this);
        }

        return $this;
    }

    public function removeExercice(Exercice $exercice): self
    {
        if ($this->exercices->removeElement($exercice)) {
            $exercice->removeMovement($this);
        }

        return $this;
    }

    public function getJoint(): ?string
    {
        return $this->joint;
    }

    public function setJoint(string $joint): self
    {
        $this->joint = $joint;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(?string $description): self
    {
        $this->description = $description;

        return $this;
    }
}
