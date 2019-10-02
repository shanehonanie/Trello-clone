package io.agileintelligence.ppmtool.services;

import io.agileintelligence.ppmtool.domain.Backlog;
import io.agileintelligence.ppmtool.domain.ProjectTask;
import io.agileintelligence.ppmtool.repositories.BacklogRepository;
import io.agileintelligence.ppmtool.repositories.ProjectTaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProjectTaskService {
    @Autowired
    private BacklogRepository backlogRepository;

    @Autowired
    private ProjectTaskRepository projectTaskRepository;

    public ProjectTask addProjectTask(String projectIdentifier, ProjectTask projectTask) {
        // PTs added to a specific project, project not null, BL exists
        Backlog backlog = backlogRepository.findByProjectIdentifier(projectIdentifier);
        // set the BL to PT
        projectTask.setBacklog(backlog);
        // Project sequence should follow increment by 1 for each new one created ID-1, ID-2, etc..
        Integer backlogSequence = backlog.getPTSequence();
        backlogSequence++;
        backlog.setPTSequence(backlogSequence);
        // Add sequence to Project Task
        projectTask.setProjectSequence(backlog.getProjectIdentifier() + "-"+ backlogSequence);
        projectTask.setProjectIdentifier(projectIdentifier);

        // Initial priority when null
        if(projectTask.getPriority() == null) {
            projectTask.setPriority(3);
        }
        // Initial status when null
        if(projectTask.getStatus() == "" || projectTask.getStatus() == null) {
            projectTask.setStatus(("TODO"));
        }
        return projectTaskRepository.save(projectTask);
    }

    public Iterable<ProjectTask> findBacklogById(String id) {
        return projectTaskRepository.findByProjectIdentifierOrderByPriority(id);
    }
}
