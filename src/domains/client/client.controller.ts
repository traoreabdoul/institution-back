import {Controller, Get, Post, Body, Patch, Param, Delete} from "@nestjs/common";
import {ApiConsumes, ApiParam, ApiTags} from "@nestjs/swagger";
import {ClientService} from "./client.service";
import {CreateClientDto} from "./dto/create-client.dto";
import {UpdateClientDto} from "./dto/update-client.dto";

@Controller("client")
@ApiTags("Crud client")
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @ApiParam({name: "userId", type: Number})
  @ApiConsumes("application/x-www-form-urlencoded")
  @Post(":userId")
  create(@Param("userId") userId: number, @Body() createClientDto: CreateClientDto) {
    return this.clientService.createClient(userId, createClientDto);
  }

  @Get()
  findAll() {
    return this.clientService.findAllClient();
  }

  @Get("/count")
  countClient() {
    return this.clientService.countClient();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.clientService.findOneClient(+id);
  }

  @Get("/user/:id")
  findAllByUser(@Param("id") id: string) {
    return this.clientService.findAllClientById(+id);
  }

  @Patch(":id")
  updateClient(@Param("id") id: string, @Body() updateClientDto: UpdateClientDto) {
    return this.clientService.updateClient(+id, updateClientDto);
  }

  @Delete(":id")
  removeClient(@Param("id") id: string) {
    return this.clientService.removeClient(+id);
  }
}
