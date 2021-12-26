package com.hiperspace.dspesquisa.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hiperspace.dspesquisa.entities.Record;

public interface RecordRepository extends JpaRepository<Record, Long>{

}
