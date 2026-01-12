---
title: Users, Roles and Permissions
---

## Users

TDengine IDMP uses email addresses as user IDs. The first person to activate TDengine IDMP is automatically granted superuser status. Then, from **Admin Console** > User Management page, they can click the “+” button in the top right corner, enter the email address, and invite others to become users of IDMP.

Invited users will receive an email containing a link. By clicking the link, entering their personal information, and setting a password, they gain access to IDMP. If a user forgets their password, they can click **Forgot Password** on the login page to reset it via email. For security reasons, the superuser does not have the authority to reset other users’ passwords.

## Roles

IDMP uses role-based access control. Each role defines access permissions—View, Add, Delete, and Edit—for one or more resources. Resources accessible to users include: elements, dashboards, analyses, events, notification rules, element templates, event templates, notification rule templates, units of measurement, categories, connections, users, roles, system configurations, and more.

The system comes with several predefined roles, but you can also create custom roles as needed. Click the "+" button on the Roles list page to add a new role.

A user can be assigned multiple roles, and their effective permissions are the union of all assigned roles.

## Element Access Control

Due to their hierarchical structure, elements in IDMP require special handling for access control. Even if a role has permission to access elements, the specific elements a user can operate on are further restricted. After a user is assigned a role with element access, the administrator must also specify top-level element nodes that the user is allowed to access. The user can view and operate on all elements under these top-level nodes, but cannot access any elements above them in the hierarchy. A user can be given access to multiple top-level element nodes.

Elements the user has no access to are completely hidden in the tree structure after login. Any associated attributes, analyses, events, panels, or dashboards linked to these inaccessible elements are also out of reach, ensuring robust data security.
