% ensures that there are not conflicting dependencies
gen_enforced_dependency(WorkspaceCwd, DependencyIdent, DependencyRange2, DependencyType) :-
  workspace_has_dependency(WorkspaceCwd, DependencyIdent, DependencyRange, DependencyType),
  workspace_has_dependency(OtherWorkspaceCwd, DependencyIdent, DependencyRange2, DependencyType2),
  DependencyRange \= DependencyRange2.

gen_enforced_dependency(WorkspaceCwd, 'react', null, dependencies) :-
  workspace_field(WorkspaceCwd, 'version', _).

gen_enforced_field(WorkspaceCwd, 'author', 'Jacob Clarke').
gen_enforced_field(WorkspaceCwd, 'repository', 'https://github.com/jacobaclarke/clarke.git').
gen_enforced_field(WorkspaceCwd, 'packageManager', 'yarn@3.2.0').
gen_enforced_field(WorkspaceCwd, 'bugs', null).
gen_enforced_field(WorkspaceCwd, 'homepage', null).

% This rule will prevent workspaces from depending on non-workspace versions of available workspaces
gen_enforced_dependency(WorkspaceCwd, DependencyIdent, 'workspace:^', DependencyType) :-
  % Iterates over all dependencies from all workspaces
    workspace_has_dependency(WorkspaceCwd, DependencyIdent, DependencyRange, DependencyType),
  % Only consider those that target something that could be a workspace
    workspace_ident(DependencyCwd, DependencyIdent).

% removes licens from private rpos
gen_enforced_field(WorkspaceCwd, 'license', null) :-
  workspace_field(WorkspaceCwd, 'private', true).