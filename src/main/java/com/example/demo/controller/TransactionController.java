package com.example.demo.controller;

import com.example.demo.model.Transaction;
import com.example.demo.service.TransactionService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.util.List;

@RestController
@RequestMapping("/api/transactions")
@CrossOrigin(origins = "*") // Allow frontend access if needed
public class TransactionController {

    private final TransactionService transactionService;

    public TransactionController(TransactionService transactionService) {
        this.transactionService = transactionService;
    }

    @PostMapping("/add")
    public ResponseEntity<Transaction> addTransaction(@RequestBody Transaction transaction) {
        Transaction savedTransaction = transactionService.saveTransaction(transaction);
        return ResponseEntity.ok(savedTransaction);
    }

    @PostMapping("/add-many")
    public ResponseEntity<List<Transaction>> addTransactions(@RequestBody List<Transaction> transactions) {
        List<Transaction> savedTransactions = transactionService.saveTransactions(transactions);
        return ResponseEntity.ok(savedTransactions);
    }

    @GetMapping("/stream")
    public SseEmitter streamTransactions() {
        SseEmitter emitter = new SseEmitter(Long.MAX_VALUE);
        transactionService.addEmitter(emitter);
        System.out.println("Client connected per SSE.");

        emitter.onCompletion(() -> {
            transactionService.removeEmitter(emitter);
            System.out.println("Emitter completed.");
        });
        emitter.onTimeout(() -> {
            transactionService.removeEmitter(emitter);
            System.out.println("Emitter timed out.");
        });
        return emitter;
    }

}
