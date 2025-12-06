package com.example.demo.service;

import com.example.demo.model.Transaction;
import com.example.demo.repository.TransactionRepository;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Sort;

import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;
import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;

@Service
public class TransactionService {

    private final TransactionRepository transactionRepository;
    // is singleton becuse of @Service
    private final List<SseEmitter> emitters = new CopyOnWriteArrayList<>();

    public TransactionService(TransactionRepository transactionRepository) {
        this.transactionRepository = transactionRepository;
    }

    public Transaction saveTransaction(Transaction transaction) {
        // Time is handled by @CreationTimestamp
        Transaction saved = transactionRepository.save(transaction);
        broadcast(saved);
        return saved;
    }

    public List<Transaction> saveTransactions(List<Transaction> transactions) {
        List<Transaction> saved = transactionRepository.saveAll(transactions);
        saved.forEach(this::broadcast);
        return saved;
    }

    public void addEmitter(SseEmitter emitter) {
        emitters.add(emitter);
    }

    public void removeEmitter(SseEmitter emitter) {
        emitters.remove(emitter);
    }

    private void broadcast(Transaction transaction) {
        System.out.println("Broadcasting transaction " + transaction.getId() + " to " + emitters.size() + " clients");
        for (SseEmitter emitter : emitters) {
            try {
                emitter.send(transaction);
            } catch (IOException e) {
                emitters.remove(emitter);
            }
        }
    }

}
