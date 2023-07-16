<?php

namespace App\Entity\Training;

use App\Entity\Athlete;
use App\Entity\Training\Set;
use App\Repository\Training\SessionRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use DateTime;

#[ORM\Entity(repositoryClass: SessionRepository::class)]
class Session
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 64)]
    private ?string $title = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $subtitle = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE, nullable: true)]
    private ?\DateTimeInterface $start = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE, nullable: true)]
    private ?\DateTimeInterface $end = null;

    #[ORM\ManyToOne(inversedBy: 'sessions')]
    private ?Athlete $athlete = null;

    #[ORM\Column]
    private ?bool $current = true;

    #[ORM\OneToMany(mappedBy: 'session', targetEntity: Set::class)]
    private Collection $sets;

    #[ORM\OneToMany(mappedBy: 'session', targetEntity: Sequence::class)]
    private Collection $sequences;

    #[ORM\Column(length: 255)]
    private ?string $slug = null;


    public function __construct()
    {
        $this->sets = new ArrayCollection();
        $this->sequences = new ArrayCollection();
    }

    public function __toString()
    {
        return $this->getTitle() . ' (' . $this->getSubtitle() . ')';
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTitle(): ?string
    {
        return $this->title;
    }

    public function setTitle(string $title): self
    {
        $this->title = $title;

        return $this;
    }

    public function getSubtitle(): ?string
    {
        return $this->subtitle;
    }

    public function setSubtitle(?string $subtitle): self
    {
        $this->subtitle = $subtitle;

        return $this;
    }

    public function getStart(): ?\DateTimeInterface
    {
        return $this->start;
    }

    public function setStart(\DateTimeInterface $start): self
    {
        $this->start = $start;

        return $this;
    }

    public function getEnd(): ?\DateTimeInterface
    {
        return $this->end;
    }

    public function setEnd(\DateTimeInterface $end): self
    {
        $this->end = $end;

        return $this;
    }

    public function getAthlete(): ?Athlete
    {
        return $this->athlete;
    }

    public function setAthlete(?Athlete $athlete): self
    {
        $this->athlete = $athlete;

        return $this;
    }

    public function isCurrent(): ?bool
    {
        return $this->current;
    }

    public function setCurrent(bool $current): self
    {
        $this->current = $current;

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
            $set->setSession($this);
        }

        return $this;
    }

    public function removeSet(Set $set): self
    {
        if ($this->sets->removeElement($set)) {
            // set the owning side to null (unless already changed)
            if ($set->getSession() === $this) {
                $set->setSession(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Sequence>
     */
    public function getSequences(): Collection
    {
        return $this->sequences;
    }

    public function addSequence(Sequence $sequence): self
    {
        if (!$this->sequences->contains($sequence)) {
            $this->sequences->add($sequence);
            $sequence->setSession($this);
        }

        return $this;
    }

    public function removeSequence(Sequence $sequence): self
    {
        if ($this->sequences->removeElement($sequence)) {
            // set the owning side to null (unless already changed)
            if ($sequence->getSession() === $this) {
                $sequence->setSession(null);
            }
        }

        return $this;
    }

    public function getExercices(): array
    {
        $exercices = array();
        // Algorithme de tri des séries
        foreach ($this->getSets() as $current) {
            $exercice = sizeof($exercices) - 1;
            if ($current->getSequence()) {
                if (isset($previous) && $current->getSequence() === $previous->getSequence()) {
                    if (!$current->isDropping()) {
                        array_push($exercices[$exercice]['sets'], array());
                    }
                }
                else {
                    $exercice++;
                    $exercices[$exercice] = [
                        'sequence' => true,
                        'exercices' => $current->getSequence()->getExercices(),
                        'sets' => [array()],
                    ];
                }
            }
            else {
                if (isset($previous) && $current->getExercice() === $previous->getExercice() && $current->getEquipment() === $previous->getEquipment()) {
                    if (!$current->isDropping()) {
                        array_push($exercices[$exercice]['sets'], array());
                    }
                }
                else {
                    $exercice++;
                    $exercices[$exercice] = [
                        'sequence' => false,
                        'name' => $current->getExercice()->getName(),
                        'equipment' => $current->getEquipment(),
                        'sets' => [array()],
                    ];
                }
            }
            $set = sizeof($exercices[$exercice]['sets']) - 1;
            array_push($exercices[$exercice]['sets'][$set], $current);
            $previous = $current;
        }
        foreach ($exercices as &$exercice) {
            if ($exercice['sequence']) {
                foreach ($exercice['exercices'] as &$part) {
                    $part['sets'] = array();
                }
                $nbExercices = sizeof($exercice['exercices']);
                $currentExercice = 0;
                
                foreach ($exercice['sets'] as $current) {
                    array_push($exercice['exercices'][$currentExercice % $nbExercices]['sets'], $current);
                    $currentExercice++;
                }
                unset($exercice['sets']);
            }
        }
        return $exercices;
    }

    public function getSlug(): ?string
    {
        return $this->slug;
    }

    public function setSlug(string $slug): self
    {
        $this->slug = $slug;

        return $this;
    }
}
