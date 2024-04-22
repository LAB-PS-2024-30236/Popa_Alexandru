package com.app.project.service;

import com.app.project.controller.ContentResponse;
import com.app.project.controller.ContentSection;
import com.app.project.model.Content;
import com.app.project.model.User;
import com.app.project.repository.ContentRepository;
import lombok.NonNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import reactor.core.scheduler.Schedulers;

import java.time.Duration;
import java.util.List;
import java.util.Random;

@Service
public class ContentService {
    public static List<ContentSection> sectionList = List.of(
            new ContentSection(
                    "Terms and Conditions of Use for Yolo",
                    "Welcome to Yolo. Your access to and use of our website and services are governed by the following terms and conditions. By using our website, you signify your acceptance of these terms: Use of Site and Content, Account Responsibility, Intellectual Property Rights, User-Generated Content, Liability Limitations, Indemnification, Governing Law and Jurisdiction, Changes to Terms and Conditions, Privacy Policy, Contact Information. By using our website, you acknowledge that you have read, understood, and agreed to be bound by these terms and conditions. Please review them regularly as continued use of the site signifies your acceptance of any changes."
            ),
            new ContentSection(
                    "Your Privacy and Security - Our Top Priority",
                    "At Yolo, we deeply value the trust you place in us. Our commitment to safeguarding your privacy and ensuring the security of your personal information is unwavering. Our comprehensive Privacy & Security Policy includes the following key areas: Data Collection and Usage, Data Protection and Security Measures, User Rights and Control, Cookies and Tracking Technologies, Third-Party Sharing and Disclosure, Updates and Changes to Our Policy, Contact Information for Privacy Concerns. Your privacy and security are at the core of everything we do at Yolo. We are committed to maintaining the highest standards of data protection and empowering you with control over your personal information. Please review this policy regularly to stay informed about our information practices."
            ),
            new ContentSection(
                    "Need Assistance? We're Here to Help!",
                    "Welcome to our comprehensive Help Center at Yolo. Whether you're new to our services or a long-time user, we're here to ensure your experience is smooth and enjoyable. Please follow these steps for assistance: FAQs, Guides and Tutorials, Community Forum, Contact Support, Feedback and Suggestions, Emergency Support, Accessibility Services. Remember, at Yolo, we're not just a service provider; we're a community dedicated to your success and satisfaction. Let us help you navigate our services with ease and confidence."
            ),
            new ContentSection(
                    "Welcome to Yolo!",
                    "At Yolo, we specialize in [describe your main services or products], offering top-notch [specific aspects of services/products] to our valued customers. Our journey began in [year], with a vision to [original mission or vision statement]. Since then, our path has been marked by [significant milestones and achievements], reflecting our commitment to excellence. Our mission at Yolo is to [revised or expanded mission statement]. We take pride in our [unique selling points]. Our diverse team of experts brings a wealth of experience and passion to [specific areas of expertise]. At the heart of our success is our belief in [core values or principles]. As we look to the future, we are excited to continue [future goals or vision]. We are grateful for the opportunity to serve you and thank you for choosing Yolo. Your trust and support inspire us to keep striving for excellence every day."
            )
    );
    @Autowired
    private WebClient webClient;
    @Autowired
    private ContentRepository contentRepository;

    public Flux<ContentResponse> getPosts(Long userId) {
        return getUserFriends(userId)
                .flatMap(friendId -> getUser(friendId)
                        .flatMapMany(user ->
                                Flux.defer(() -> Flux.fromIterable(contentRepository.findByUserId(friendId))) // Wrap the blocking call
                                        .subscribeOn(Schedulers.boundedElastic()) // Use boundedElastic for blocking IO tasks
                                        .map(content -> mapToContentResponse(content, user))
                        )
                );
    }


    public List<Content> getUserPosts(Long userId) {
        return contentRepository.findAllByUserId(userId);
    }


    public Flux<ContentResponse> getRandomPosts(Long userId) {
        return generateRandomIds(userId)
                .flatMap(friendId ->
                        getUser((Long) friendId)
                                .zipWith(Mono.just(contentRepository.findLatestByUserId((Long) friendId, PageRequest.of(0, 1, Sort.by(Sort.Direction.DESC, "datePosted"))).getContent().get(0)))
                                .map(tuple -> {
                                    User user = tuple.getT1();
                                    Content content = tuple.getT2();
                                    return mapToContentResponse(content, user);
                                }))
                .timeout(Duration.ofSeconds(1))
                .onErrorResume(e -> {
                    System.out.println("Operation timed out: " + e.getMessage());
                    return Flux.empty();
                });
    }


    private ContentResponse mapToContentResponse(Content content, User userEntity) {
        return ContentResponse.builder()
                .contentId(content.getContentId())
                .user(userEntity)
                .photo(content.getPhoto())
                .datePosted(content.getDatePosted())
                .description(content.getDescription())
                .build();
    }


    private Flux<Long> getUserFriends(@NonNull Long userId) {
        var webRequest = webClient
                .get()
                .uri("http://localhost:8085/api/connections/" + userId + "/following")
                .accept(MediaType.APPLICATION_JSON);

        return webRequest.exchangeToFlux(response -> {
            if (response.statusCode() == HttpStatus.OK) {
                return response.bodyToFlux(Long.class);
            } else {
                return response.bodyToFlux(String.class)
                        .flatMap(body -> Flux.error(new RuntimeException("Request failed:" + body)));
            }
        });
    }

    private Mono<User> getUser(@NonNull Long userId) {
        var webRequest = webClient
                .get()
                .uri("http://localhost:8080/api/user/getSession/" + userId)
                .header(HttpHeaders.AUTHORIZATION, "Bearer eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiIyIiwiaWF0IjoxNjk5NDY1MDY1LCJzdWIiOiJocnViYW5hbmRyYWRhQGdtYWlsLmNvbSIsImlzcyI6InBvcGEmcm9iZXJ0IiwiZXhwIjoxNzAwNDY1MDY1fQ.yIRaCz1opmBzRtCTVjOBpb4bNf2O5h_BZikh4ArLgj4")
                .accept(MediaType.APPLICATION_JSON);

        return webRequest.exchangeToMono(response -> {
            if (response.statusCode() == HttpStatus.OK) {
                return response.bodyToMono(User.class);
            } else {
                return response.bodyToMono(String.class)
                        .flatMap(body -> Mono.error(new RuntimeException("Request failed:" + body)));
            }
        });
    }

    private List<Long> getUsers() {
        WebClient webClient = WebClient.create(); // Ensure you initialize your WebClient instance appropriately

        return webClient.get()
                .uri("http://localhost:8080/api/user/allUsers")
                .header(HttpHeaders.AUTHORIZATION, "Bearer eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiIyIiwiaWF0IjoxNjk5NDY1MDY1LCJzdWIiOiJocnViYW5hbmRyYWRhQGdtYWlsLmNvbSIsImlzcyI6InBvcGEmcm9iZXJ0IiwiZXhwIjoxNzAwNDY1MDY1fQ.yIRaCz1opmBzRtCTVjOBpb4bNf2O5h_BZikh4ArLgj4")
                .accept(MediaType.APPLICATION_JSON)
                .retrieve()
                .bodyToFlux(User.class)
                .map(User::getUserId)
                .collectList()
                .block();
    }

    private Flux<Long> generateRandomIds(Long userId) {
        return Flux.create(sink -> {
            List<Long> availableIds = getUsers();
            Flux<Long> friendIdsFlux = getUserFriends(userId);
            Mono<List<Long>> friendIdsListMono = friendIdsFlux.collectList();
            List<Long> friendIdsList = friendIdsListMono.block();
            availableIds.removeAll(friendIdsList);
            availableIds.remove(userId);
            if (availableIds.isEmpty()) {
                sink.error(new IllegalStateException("The list of available IDs is empty."));
                return;
            }

            Random random = new Random();
            // Assuming you want to generate up to 5 IDs, as per your previous implementation
            for (int i = 0; i < 5; i++) {
                if (availableIds.isEmpty()) {
                    // This additional check is for scenarios where the list might become empty
                    // during the generation process, though it's more relevant if IDs are being
                    // removed after selection.
                    sink.error(new IllegalStateException("Ran out of available IDs to select."));
                    return;
                }
                int index = random.nextInt(availableIds.size());
                Long selectedId = availableIds.get(index);
                sink.next(selectedId);
                // If you're removing selected IDs from the list to ensure uniqueness:
                availableIds.remove(index);
            }
            sink.complete();
        });
    }


    public Content addPost(Content post) {
        return contentRepository.save(post);
    }


    public void removePost(Long postId) {
        if (contentRepository.existsById(postId)) {
            contentRepository.deleteById(postId);
        } else {
            throw new RuntimeException("Post not found with id: " + postId);
        }
    }
}


