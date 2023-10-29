<?php

namespace App\Entity;

use App\Repository\SettingsRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: SettingsRepository::class)]
class Settings
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\OneToOne(inversedBy: 'settings', cascade: ['persist', 'remove'])]
    private ?Athlete $athlete = null;

    #[ORM\Column(length: 255)]
    private ?string $unit = null;

    #[ORM\Column(nullable: true)]
    private ?bool $measurement = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getAthlete(): ?Athlete
    {
        return $this->athlete;
    }

    public function setAthlete(?Athlete $athlete): static
    {
        $this->athlete = $athlete;

        return $this;
    }

    public function getUnit(): ?string
    {
        return $this->unit;
    }

    public function setUnit(string $unit): static
    {
        $this->unit = $unit;

        return $this;
    }

    public function isMeasurement(): ?bool
    {
        return $this->measurement;
    }

    public function setMeasurement(bool $measurement): self
    {
        $this->measurement = $measurement;

        return $this;
    }
}
