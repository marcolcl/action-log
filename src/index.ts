import * as github from '@actions/github';
import * as core from '@actions/core';
import { RestEndpointMethodTypes } from '@octokit/plugin-rest-endpoint-methods';

const token = process.env['github-token'] || '';

type PullRequests = RestEndpointMethodTypes['issues']['list']['response']['data'];

const run = async (): Promise<void> => {
  const octokit = github.getOctokit(token);
  const result = await octokit.issues.list({
    filter: 'created',
    state: 'all',
    pulls: true,
    per_page: 10,
  });

  const pullRequests: PullRequests = result.data;

  pullRequests.forEach(pullRequest => {
    const { title, repository, created_at } = pullRequest;
    core.debug(`${title} ${repository?.name} ${created_at}`);
  });
};

run();
