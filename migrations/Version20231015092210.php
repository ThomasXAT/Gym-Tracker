<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20231015092210 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE athlete (id INT AUTO_INCREMENT NOT NULL, quotation_id INT DEFAULT NULL, username VARCHAR(16) NOT NULL, roles JSON NOT NULL, password VARCHAR(255) NOT NULL, email VARCHAR(128) NOT NULL, firstname VARCHAR(24) DEFAULT NULL, surname VARCHAR(24) DEFAULT NULL, description LONGTEXT DEFAULT NULL, picture LONGTEXT DEFAULT NULL, registration DATETIME NOT NULL, measurement TINYINT(1) DEFAULT NULL, unit VARCHAR(255) NOT NULL, UNIQUE INDEX UNIQ_C03B8321F85E0677 (username), INDEX IDX_C03B8321B4EA4E60 (quotation_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE bundle (id INT AUTO_INCREMENT NOT NULL, muscle_id INT DEFAULT NULL, name VARCHAR(255) NOT NULL, INDEX IDX_A57B32FD354FDBB4 (muscle_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE exercice (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(255) NOT NULL, equipments LONGTEXT DEFAULT NULL COMMENT \'(DC2Type:array)\', PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE exercice_movement (exercice_id INT NOT NULL, movement_id INT NOT NULL, INDEX IDX_5C47F1D489D40298 (exercice_id), INDEX IDX_5C47F1D4229E70A7 (movement_id), PRIMARY KEY(exercice_id, movement_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE measurement (id INT AUTO_INCREMENT NOT NULL, athlete_id INT NOT NULL, height DOUBLE PRECISION DEFAULT NULL, weight DOUBLE PRECISION DEFAULT NULL, date DATETIME NOT NULL, INDEX IDX_2CE0D811FE6BCB8B (athlete_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE movement (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(255) NOT NULL, joint VARCHAR(255) NOT NULL, description LONGTEXT DEFAULT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE movement_muscle (movement_id INT NOT NULL, muscle_id INT NOT NULL, INDEX IDX_9E3147D3229E70A7 (movement_id), INDEX IDX_9E3147D3354FDBB4 (muscle_id), PRIMARY KEY(movement_id, muscle_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE movement_bundle (movement_id INT NOT NULL, bundle_id INT NOT NULL, INDEX IDX_C85B6CC1229E70A7 (movement_id), INDEX IDX_C85B6CC1F1FAD9D3 (bundle_id), PRIMARY KEY(movement_id, bundle_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE muscle (id INT AUTO_INCREMENT NOT NULL, muscle_group_id INT DEFAULT NULL, name VARCHAR(255) NOT NULL, INDEX IDX_F31119EF44004D0 (muscle_group_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE muscle_group (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE quotation (id INT AUTO_INCREMENT NOT NULL, text VARCHAR(96) NOT NULL, author VARCHAR(48) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE sequence (id INT AUTO_INCREMENT NOT NULL, session_id INT DEFAULT NULL, size INT NOT NULL, INDEX IDX_5286D72B613FECDF (session_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE session (id INT AUTO_INCREMENT NOT NULL, athlete_id INT DEFAULT NULL, title VARCHAR(64) NOT NULL, subtitle VARCHAR(255) DEFAULT NULL, start DATETIME DEFAULT NULL, end DATETIME DEFAULT NULL, current TINYINT(1) NOT NULL, slug VARCHAR(255) NOT NULL, string LONGTEXT NOT NULL, INDEX IDX_D044D5D4FE6BCB8B (athlete_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE `set` (id INT AUTO_INCREMENT NOT NULL, exercice_id INT DEFAULT NULL, session_id INT DEFAULT NULL, sequence_id INT DEFAULT NULL, equipment VARCHAR(255) NOT NULL, symmetry VARCHAR(255) NOT NULL, repetitions INT NOT NULL, weight DOUBLE PRECISION NOT NULL, concentric DOUBLE PRECISION DEFAULT NULL, isometric DOUBLE PRECISION DEFAULT NULL, eccentric DOUBLE PRECISION DEFAULT NULL, date DATETIME NOT NULL, dropping TINYINT(1) NOT NULL, INDEX IDX_E61425DC89D40298 (exercice_id), INDEX IDX_E61425DC613FECDF (session_id), INDEX IDX_E61425DC98FB19AE (sequence_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE messenger_messages (id BIGINT AUTO_INCREMENT NOT NULL, body LONGTEXT NOT NULL, headers LONGTEXT NOT NULL, queue_name VARCHAR(190) NOT NULL, created_at DATETIME NOT NULL COMMENT \'(DC2Type:datetime_immutable)\', available_at DATETIME NOT NULL COMMENT \'(DC2Type:datetime_immutable)\', delivered_at DATETIME DEFAULT NULL COMMENT \'(DC2Type:datetime_immutable)\', INDEX IDX_75EA56E0FB7336F0 (queue_name), INDEX IDX_75EA56E0E3BD61CE (available_at), INDEX IDX_75EA56E016BA31DB (delivered_at), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE athlete ADD CONSTRAINT FK_C03B8321B4EA4E60 FOREIGN KEY (quotation_id) REFERENCES quotation (id)');
        $this->addSql('ALTER TABLE bundle ADD CONSTRAINT FK_A57B32FD354FDBB4 FOREIGN KEY (muscle_id) REFERENCES muscle (id)');
        $this->addSql('ALTER TABLE exercice_movement ADD CONSTRAINT FK_5C47F1D489D40298 FOREIGN KEY (exercice_id) REFERENCES exercice (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE exercice_movement ADD CONSTRAINT FK_5C47F1D4229E70A7 FOREIGN KEY (movement_id) REFERENCES movement (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE measurement ADD CONSTRAINT FK_2CE0D811FE6BCB8B FOREIGN KEY (athlete_id) REFERENCES athlete (id)');
        $this->addSql('ALTER TABLE movement_muscle ADD CONSTRAINT FK_9E3147D3229E70A7 FOREIGN KEY (movement_id) REFERENCES movement (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE movement_muscle ADD CONSTRAINT FK_9E3147D3354FDBB4 FOREIGN KEY (muscle_id) REFERENCES muscle (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE movement_bundle ADD CONSTRAINT FK_C85B6CC1229E70A7 FOREIGN KEY (movement_id) REFERENCES movement (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE movement_bundle ADD CONSTRAINT FK_C85B6CC1F1FAD9D3 FOREIGN KEY (bundle_id) REFERENCES bundle (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE muscle ADD CONSTRAINT FK_F31119EF44004D0 FOREIGN KEY (muscle_group_id) REFERENCES muscle_group (id)');
        $this->addSql('ALTER TABLE sequence ADD CONSTRAINT FK_5286D72B613FECDF FOREIGN KEY (session_id) REFERENCES session (id)');
        $this->addSql('ALTER TABLE session ADD CONSTRAINT FK_D044D5D4FE6BCB8B FOREIGN KEY (athlete_id) REFERENCES athlete (id)');
        $this->addSql('ALTER TABLE `set` ADD CONSTRAINT FK_E61425DC89D40298 FOREIGN KEY (exercice_id) REFERENCES exercice (id)');
        $this->addSql('ALTER TABLE `set` ADD CONSTRAINT FK_E61425DC613FECDF FOREIGN KEY (session_id) REFERENCES session (id)');
        $this->addSql('ALTER TABLE `set` ADD CONSTRAINT FK_E61425DC98FB19AE FOREIGN KEY (sequence_id) REFERENCES sequence (id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE athlete DROP FOREIGN KEY FK_C03B8321B4EA4E60');
        $this->addSql('ALTER TABLE bundle DROP FOREIGN KEY FK_A57B32FD354FDBB4');
        $this->addSql('ALTER TABLE exercice_movement DROP FOREIGN KEY FK_5C47F1D489D40298');
        $this->addSql('ALTER TABLE exercice_movement DROP FOREIGN KEY FK_5C47F1D4229E70A7');
        $this->addSql('ALTER TABLE measurement DROP FOREIGN KEY FK_2CE0D811FE6BCB8B');
        $this->addSql('ALTER TABLE movement_muscle DROP FOREIGN KEY FK_9E3147D3229E70A7');
        $this->addSql('ALTER TABLE movement_muscle DROP FOREIGN KEY FK_9E3147D3354FDBB4');
        $this->addSql('ALTER TABLE movement_bundle DROP FOREIGN KEY FK_C85B6CC1229E70A7');
        $this->addSql('ALTER TABLE movement_bundle DROP FOREIGN KEY FK_C85B6CC1F1FAD9D3');
        $this->addSql('ALTER TABLE muscle DROP FOREIGN KEY FK_F31119EF44004D0');
        $this->addSql('ALTER TABLE sequence DROP FOREIGN KEY FK_5286D72B613FECDF');
        $this->addSql('ALTER TABLE session DROP FOREIGN KEY FK_D044D5D4FE6BCB8B');
        $this->addSql('ALTER TABLE `set` DROP FOREIGN KEY FK_E61425DC89D40298');
        $this->addSql('ALTER TABLE `set` DROP FOREIGN KEY FK_E61425DC613FECDF');
        $this->addSql('ALTER TABLE `set` DROP FOREIGN KEY FK_E61425DC98FB19AE');
        $this->addSql('DROP TABLE athlete');
        $this->addSql('DROP TABLE bundle');
        $this->addSql('DROP TABLE exercice');
        $this->addSql('DROP TABLE exercice_movement');
        $this->addSql('DROP TABLE measurement');
        $this->addSql('DROP TABLE movement');
        $this->addSql('DROP TABLE movement_muscle');
        $this->addSql('DROP TABLE movement_bundle');
        $this->addSql('DROP TABLE muscle');
        $this->addSql('DROP TABLE muscle_group');
        $this->addSql('DROP TABLE quotation');
        $this->addSql('DROP TABLE sequence');
        $this->addSql('DROP TABLE session');
        $this->addSql('DROP TABLE `set`');
        $this->addSql('DROP TABLE messenger_messages');
    }
}
