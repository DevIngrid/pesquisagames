package com.hiperspace.dspesquisa.repositories;

import java.time.Instant;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.hiperspace.dspesquisa.entities.Record;

public interface RecordRepository extends JpaRepository<Record, Long>{
	
	//coalesce(:min, null) e coalesce(:max, null) foi só para funcionar no Postgres
	//do contrario seria :min is null e max is null
	
	@Query("select r from Record r where "
			+ "(coalesce(:min, null) is null or r.moment >= :min) and "
			+ "(coalesce(:max, null) is null or r.moment<= :max)")
	Page<Record> findByMoments(Instant min, Instant max, Pageable pageable);

	

}
