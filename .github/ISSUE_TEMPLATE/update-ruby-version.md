---
name: "Update Ruby Version"
about: "Used by bot to request updating the Ruby version of the Docker file in ghpages-docker repo."
title: "GHPAGES-DOCKER needs to be updated - Ruby"
labels: "complexity: medium,feature: docker,role: DevOps Engineer,role: Site Reliability Engineer,size: 3pt"
projects: "CoP: DevOps: Project Board"
milestones: "06.02 Infrastructure - Org - Should have"
---

### Overview

GitHub Pages is now using **v{{ RUBY_RELEASE_VERSION }}** of Ruby. You are using **v{{ RUBY_CURRENT_VERSION }}**.

We need to update the Ruby version in the Docker image that is used to run local instances of hackforla.org, so that developers can properly test their changes.

### Action Items

1. [ ] Search the official Ruby image repo [^1] on Docker Hub for a Ruby image tag that matches the new Ruby version number. The tags follow the format `<Ruby_Version>-<Alpine_Version>`, ex. `2.7.3-alpine3.13`. Choose the latest Alpine version unless otherwise specified.

2. [ ] In the `ghpages-docker` `Dockerfile`, search for the `BUILD STAGE 1` section and replace the tag after `FROM` with the new Ruby image tag.

   Ex.

   ```
   ###
   ### BUILD STAGE 1
   ###

   ...

   FROM ruby:2.7.3-alpine3.13 AS build
   ```

3. [ ] Do the same for `BUILD STAGE 2`.

   Ex.

   ```
   ###
   ### BUILD STAGE 2
   ###

   FROM ruby:2.7.3-alpine3.13
   ```

After pushing the updated `Dockerfile` to the `ghpages-docker` repo, a GitHub action will rebuild and push the updated image to Docker Hub.

### Resources/Instructions

- [ghpages-docker Wiki > How do you update ghpages-docker? > If the version of Ruby has changed](https://github.com/hackforla/ghpages-docker/wiki#if-the-version-of-ruby-has-changed)

[^1]: [ruby on Docker Hub](https://hub.docker.com/_/ruby?tab=tags)
