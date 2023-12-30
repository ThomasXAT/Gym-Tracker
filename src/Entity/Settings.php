<?php

namespace App\Entity;

use App\Repository\SettingsRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: SettingsRepository::class)]
class Settings
{
    const KG = 'kg';
    const LBS = 'lbs';
    const UNITS = [
        self::KG,
        self::LBS,
    ];

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

    #[ORM\Column]
    private ?bool $bmi = null;

    #[ORM\Column]
    private ?bool $timer = null;

    #[ORM\Column]
    private ?bool $training = null;

    #[ORM\Column(nullable: true)]
    private ?int $offset = null;

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

    public function isBmi(): ?bool
    {
        return $this->bmi;
    }

    public function setBmi(bool $bmi): static
    {
        $this->bmi = $bmi;

        return $this;
    }

    public function isTimer(): ?bool
    {
        return $this->timer;
    }

    public function setTimer(bool $timer): static
    {
        $this->timer = $timer;

        return $this;
    }

    public function isTraining(): ?bool
    {
        return $this->training;
    }

    public function setTraining(bool $training): static
    {
        $this->training = $training;

        return $this;
    }

    public function getOffset(): ?int
    {
        return $this->offset;
    }

    public function setOffset(?int $offset): static
    {
        $this->offset = $offset;

        return $this;
    }
}
