package com.hiperspace.dspesquisa.services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hiperspace.dspesquisa.dto.GameDTO;
import com.hiperspace.dspesquisa.entities.Game;
import com.hiperspace.dspesquisa.repositories.GameRepository;

@Service
public class GameService {
	
	@Autowired
	private GameRepository repository;
	
	@Transactional(readOnly = true)
	public List<GameDTO> findAll() {
		List <Game> games = repository.findAll();
		return games.stream().map(game -> new GameDTO(game)).collect(Collectors.toList());
	}

}
