<?php

namespace App\Entity\Biomechanics;

use App\Entity\Anatomy\Bundle;
use App\Entity\Anatomy\Muscle;
use App\Repository\Biomechanics\MovementRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
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

    public function __construct()
    {
        $this->Muscles = new ArrayCollection();
        $this->Bundles = new ArrayCollection();
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
}
