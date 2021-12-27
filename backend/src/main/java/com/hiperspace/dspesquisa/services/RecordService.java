package com.hiperspace.dspesquisa.services;

import java.time.Instant;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hiperspace.dspesquisa.dto.RecordDTO;
import com.hiperspace.dspesquisa.dto.RecordInsertDTO;
import com.hiperspace.dspesquisa.entities.Game;
import com.hiperspace.dspesquisa.entities.Record;
import com.hiperspace.dspesquisa.repositories.GameRepository;
import com.hiperspace.dspesquisa.repositories.RecordRepository;

@Service
public class RecordService {
	
	@Autowired
	private RecordRepository repository;
	
	@Autowired
	private GameRepository gameRepository;
	
	@Transactional
	public RecordDTO insert(RecordInsertDTO dto) {
		Record entity = new Record();
		entity.setName(dto.getName());
		entity.setAge(dto.getAge());
		entity.setMoment(Instant.now());
		
		
		Game game = gameRepository.findById(dto.getGameId()).get();
		
		entity.setGame(game);
		
		entity = repository.save(entity);
		
		return new RecordDTO(entity);
		
	}
	
	@Transactional(readOnly = true)
	public Page<RecordDTO> findByMoments(Instant minDate, Instant maxDate, Pageable pageable) {
		return repository.findByMoments(minDate, maxDate, pageable).map(x -> new RecordDTO(x));
	}

}
