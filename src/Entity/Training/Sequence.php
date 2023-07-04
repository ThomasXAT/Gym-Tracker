<?php

namespace App\Entity\Training;

use App\Repository\Training\SequenceRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: SequenceRepository::class)]
class Sequence
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\ManyToOne(inversedBy: 'sequences')]
    private ?Session $session = null;

    #[ORM\OneToMany(mappedBy: 'sequence', targetEntity: Set::class)]
    private Collection $sets;

    public function __construct()
    {
        $this->sets = new ArrayCollection();
    }

    public function __toString()
    {
        $exercices = array();
        foreach ($this->getSets() as $set) {
            if (!in_array($set->getExercice()->__toString(), $exercices)) {
                array_push($exercices, $set->getExercice()->__toString());
            }
        }
        $string = '';
        foreach ($exercices as $exercice) {
            if ($exercice != end($exercices)) {
                $string .= $exercice . ', ';
            }
            else {
                $string .= $exercice;
            }
        }
        return $string;
    }

    public function getId(): ?int
    {
        return $this->id;
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
            $set->setSequence($this);
        }

        return $this;
    }

    public function removeSet(Set $set): self
    {
        if ($this->sets->removeElement($set)) {
            // set the owning side to null (unless already changed)
            if ($set->getSequence() === $this) {
                $set->setSequence(null);
            }
        }

        return $this;
    }
}
