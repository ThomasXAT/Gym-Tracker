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

    #[ORM\Column]
    private ?int $size = null;

    public function __construct()
    {
        $this->sets = new ArrayCollection();
    }

    public function __toString()
    {
        $string = '';
        foreach ($this->getExercices() as $exercice) {
            $string .= $exercice['fullname'] . ', ';
        }
        return substr($string, 0, -2);
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

    public function getExercices()
    {
        $exercices = array();
        $size = $this->getSize();
        $exercice = sizeof($exercices) - 1;
        foreach($this->getSets() as $current) {
            if (!$current->isDropping()) {
                $exercice = ($exercice + 1) % $size;
                if (isset($exercices[$exercice])) {
                    array_push($exercices[$exercice]['sets'], array());
                }
                else {
                    $name = $current->getExercice()->getName();
                    $equipment = $current->getEquipment();
                    array_push($exercices, [
                        'id' => $current->getExercice()->getId(),
                        'fullname' => $name . ' (' . mb_strtolower(array_search($equipment, Exercice::EQUIPMENTS)) . ')', 
                        'name' => $name, 
                        'equipment' => $equipment, 
                        'sets' => [array()],
                    ]);
                }
            }   
            $set = sizeof($exercices[$exercice]['sets']) - 1;
            array_push($exercices[$exercice]['sets'][$set], $current);
        }
        return $exercices;
    }

    public function getSize(): ?int
    {
        return $this->size;
    }

    public function setSize(int $size): self
    {
        $this->size = $size;

        return $this;
    }
}
