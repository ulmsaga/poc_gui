package com.mobigen.cdev.poc.core.sse.controller;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import com.mobigen.cdev.poc.core.sse.emmiter.EventEmitter;


@RestController
@RequestMapping("sse")
public class EventController {

  private final EventEmitter eventEmitter;
  private final long SSE_SESSION_TIMEOUT = 30 * 60 * 1000L;
  
  public EventController(EventEmitter eventEmitter) {
    this.eventEmitter = eventEmitter;
  }
  
  @GetMapping(value = "/subscribe", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
	public ResponseEntity<SseEmitter> connectSse() {
		SseEmitter emitter = new SseEmitter(SSE_SESSION_TIMEOUT);
		eventEmitter.add(emitter);
    eventEmitter.connectAndSendExistData(emitter, EventEmitter.DEFAULT_EVENT_NAME);

		return ResponseEntity.ok(emitter);
	}


}
