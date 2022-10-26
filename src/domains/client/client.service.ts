import {HttpException, HttpStatus, Injectable} from "@nestjs/common";
import {CreateClientDto} from "./dto/create-client.dto";
import {UpdateClientDto} from "./dto/update-client.dto";
import {ClientEntity} from "./entities/client.entity";
import {UsersService} from "./../users/services/users.service";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {info} from "console";
import {EvaluationStatus} from "../../common/constants/constants";

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(ClientEntity) private clientRepository: Repository<ClientEntity>,
    private readonly userService: UsersService,
  ) {}

  async createClient(userId: number, createClientDto: CreateClientDto) {
    if (await this.findClientByCode(createClientDto.businessCode)) {
      throw new HttpException("Client alreadt exist", HttpStatus.BAD_REQUEST);
    }
    const createClient = new ClientEntity();
    const newClient = await this.addUserToClient(userId, createClient);
    newClient.address = createClientDto.businessAdresse1;
    newClient.email = createClientDto.businessEmail;
    newClient.nom = createClientDto.businessName;
    newClient.pays = createClientDto.businessCountry;
    newClient.photo = createClientDto.businessLogo;
    newClient.regime = createClientDto.businessRegime;
    newClient.ville = createClientDto.businessTown;
    newClient.code = createClientDto.businessCode;
    try {
      await this.clientRepository.save(newClient);
      return newClient;
    } catch (err) {
      throw new HttpException(err.detail, HttpStatus.UNAUTHORIZED);
    }
  }

  // add user to client
  async addUserToClient(userId: number, client: ClientEntity) {
    const user = await this.userService.getUserById(userId);
    client.user = user;
    return client;
  }

  async findAllClient() {
    const clients = await this.clientRepository.find({
      where: {isDeleted: false},
      relations: {user: true},
    });
    return clients;
  }

  async countClient() {
    const attente = await this.clientRepository.countBy({
      isDeleted: false,
      evaluationStatus: EvaluationStatus.ATTENTE,
    });
    const rejete = await this.clientRepository.countBy({
      isDeleted: false,
      evaluationStatus: EvaluationStatus.REJETE,
    });
    const valide = await this.clientRepository.countBy({
      isDeleted: false,
      evaluationStatus: EvaluationStatus.VALIDE,
    });

    return {attente, valide, rejete};
  }

  async findOneClient(id: number) {
    const client = await this.clientRepository.findOne({
      where: {id: id, isDeleted: false},
      relations: {user: true},
    });
    if (client) {
      return client;
    }
    throw new HttpException("User not found", HttpStatus.NOT_FOUND);
  }

  async findClientByCode(code: string) {
    const clients = await this.clientRepository.findOne({
      where: {isDeleted: false, code: code},
      relations: {user: true},
    });
    return clients;
  }

  async findAllClientById(id: number) {
    const user = await this.userService.getUserById(id);
    const clients = await this.clientRepository.find({
      where: {isDeleted: false, user: user},
      relations: {user: true},
    });
    return clients;
  }

  updateClient(id: number, updateClientDto: UpdateClientDto) {
    return `This action updates a #${id} client`;
  }

  async removeClient(id: number) {
    const deletedClient = await this.clientRepository.findOneBy({id: id});
    if (deletedClient.isDeleted) {
      throw new HttpException("client not found", HttpStatus.NOT_FOUND);
    }
    deletedClient.isDeleted = true;
    await this.clientRepository.update(deletedClient.id, deletedClient);
    return {message: "succes"};
  }
}
