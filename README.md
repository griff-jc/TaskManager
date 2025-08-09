# TaskManager

## Running the project

The backend requires a local postgresql instance be available. 
It also requires the `appsettings.json` file have the `[USERNAME]` and `[PASSWORD]` fields be set with the account details that has full database create/read/write permissions.

Aside from the above, the project can be started via `dotnet run TaskManager.csproj` from within the `TaskManager` folder.
The project, assuming correct database user permissions, will automatically apply the migration, and seed the database with sample data.

Once the backend is running, you can navigate to `http://localhost:5077/scalar/v1` to view a web representation of the OpenAPI document that the project produces.

To run the UI, you will need to run `npm install` and install the project requirements. You will also need angular 20 installed for the `ng` tool.

To start the UI simply run `ng serve`, the config has been setup such that it should automatically proxy the requests to the backend port for you.

To run tests `ng test`.

For e2e `ng e2e` can be used, but please be aware it requires a functional backend be available due to it requiring data and the ability to create new tasks.

## Architectural Decisions

The backend was designed under the assumption that more functionality would be required in future, and that this would be considered a starting point for a product.
As such there are certain choices made that in their current context do not seem to have much value. The main one being the ability to change persistence providers, this was done so that in future it would be possible for multiple data stores to be used, based on the needs of the domain. An example of this could be a Redis store that acts as a KV cache for tasks, or instead is used for real-time collaboration.

This decision is also why the project uses a hexagonal style architecture, where the central domain has no dependencies on the other projects and instead simply provides the interfaces that they must adhere to. Again for a simple app such as this, the domain layer itself is quite thin, and most of the logic ends up residing either in the controller in validation and return handling, or in the persistence layer.

The project also lacks any sort of authentication/authorization controls, this is due to it often being tied to the Auth provider and so felt out of scope for a small project such as this.

For scaling the project itself is capable of scaling beyond 1 instance, the limiting factor would likely be the compute resourcing, or bottlenecks within the EFCore generated SQL, or the database itself. No containerfile was created for the project to keep things simple, but it would not take much to containerize the API itself as it is just a standard dotnet application. For the UI other decisions would need to be made, such as how to serve the project as it does not use SSR, and so can be hosted as static content. Which might better suite it for other deployment options than containers.

## AI Usage

Throughout the project CoPilot auto complete responses have been used, and for the UI it was used to generate the structures and responsive styling. But the fundamental design of the behaviors (for example the split view/edit mode) came from me and were implemented by myself.
