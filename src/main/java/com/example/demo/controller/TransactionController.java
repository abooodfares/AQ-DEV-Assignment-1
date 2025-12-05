package com.example.demo.controller;

import com.example.demo.model.Transaction;
import com.example.demo.service.TransactionService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;
import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;

@RestController
@RequestMapping("/api/transactions")
@CrossOrigin(origins = "*") // Allow frontend access if needed
public class TransactionController {

    private final TransactionService transactionService;

    public TransactionController(TransactionService transactionService) {
        this.transactionService = transactionService;
    }

    private final List<SseEmitter> emitters = new CopyOnWriteArrayList<>();

    @PostMapping("/add")
    public ResponseEntity<Transaction> addTransaction(@RequestBody Transaction transaction) {
        Transaction savedTransaction = transactionService.saveTransaction(transaction);
        broadcast(savedTransaction);
        return ResponseEntity.ok(savedTransaction);
    }

    @PostMapping("/add-many")
    public ResponseEntity<List<Transaction>> addTransactions(@RequestBody List<Transaction> transactions) {
        List<Transaction> savedTransactions = transactionService.saveTransactions(transactions);
        savedTransactions.forEach(this::broadcast);
        return ResponseEntity.ok(savedTransactions);
    }

    @GetMapping("/stream")
    public SseEmitter streamTransactions() {
        SseEmitter emitter = new SseEmitter(Long.MAX_VALUE);
        emitters.add(emitter);
        emitter.onCompletion(() -> emitters.remove(emitter));
        emitter.onTimeout(() -> emitters.remove(emitter));
        return emitter;
    }

    private void broadcast(Transaction transaction) {
        for (SseEmitter emitter : emitters) {
            try {
                emitter.send(transaction);
            } catch (IOException e) {
                emitters.remove(emitter);
            }
        }
    }
}
