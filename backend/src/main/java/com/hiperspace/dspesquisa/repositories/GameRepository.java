package com.hiperspace.dspesquisa.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hiperspace.dspesquisa.entities.Game;

public interface GameRepository extends JpaRepository<Game, Long>{

}
