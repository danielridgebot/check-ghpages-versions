---
name: "Update GitHub Pages Ruby Gem Version"
about: "Used by bot to request updating the GitHub Pages Ruby Gem Version in ghpages Docker image."
title: "GHPAGES-DOCKER needs to be updated - GitHub Pages Ruby Gem"
labels: "complexity: medium,feature: docker,role: DevOps Engineer,role: Site Reliability Engineer,size: 3pt"
projects: "CoP: DevOps: Project Board"
milestones: "06.02 Infrastructure - Org - Should have"
---

### Overview

GitHub Pages is now using **v{{ PAGES_RELEASE_VERSION }}** of the GitHub Pages Ruby Gem. You are using **v{{ PAGES_CURRENT_VERSION }}**.

We need to update the GitHub Pages Ruby Gem version in the Docker image that is used to run local instances of hackforla.org, so that developers can properly test their changes.

### Action Items

No update to the `Dockerfile` is necessary, because the GitHub Pages gem is installed without a version number specified. This means that any time the image is rebuilt, the latest version of `github-pages` will be installed automatically. So, when `github-pages` changes, all we need to do is rebuild the image.

1. [ ] Navigate to the **Actions** tab in the menu at the top of the [`ghpages-docker` repo](https://github.com/hackforla/ghpages-docker/actions).

2. [ ] In the list of workflows on the left, click the [**Publish Docker Image** workflow](https://github.com/hackforla/ghpages-docker/actions/workflows/build-and-push-to-docker-hub.yml).

3. [ ] Click the **Run Workflow** button on the right. This will manually trigger the GitHub action to rebuild and push the image.

### Resources/Instructions

- [ghpages-docker Wiki > How do you update ghpages-docker? > If the version of the `github-pages` gem has changed](https://github.com/hackforla/ghpages-docker/wiki#if-the-version-of-the-github-pages-gem-has-changed)
