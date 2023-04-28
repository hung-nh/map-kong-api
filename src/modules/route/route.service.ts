import { Injectable, BadRequestException } from '@nestjs/common';
import { RouteRepository } from 'src/modules/route/route.repository';
import fetch from 'node-fetch';
import { ServiceRepository } from 'src/modules/service/service.repository';
import { Service } from 'src/modules/service/entities/service.entity';
import { Route } from 'src/modules/route/entities/route.entity';
import { v4 as uuidv4 } from 'uuid';
import { clientOpenApiUrl, serviceName, priority } from '../../../setup.json';

@Injectable()
export class RouteService {
  constructor(
    private readonly routeRepository: RouteRepository,
    private readonly serviceRepository: ServiceRepository,
  ) {}

  async saveRouter(): Promise<string> {
    console.log(clientOpenApiUrl, serviceName, priority);
    const service: Service = await this.serviceRepository.findOne({
      where: {
        name: serviceName,
      },
    });
    if (service === null) {
      throw new BadRequestException('Service name not found');
    }
    const path = service.path;
    const data = fetch(clientOpenApiUrl).then(
      (res) =>
        new Promise((resolve, reject) => {
          let results = '';
          res.body.on('data', (data: any) => (results += data.toString()));
          res.body.on('end', () => resolve(results));
          res.body.on('error', reject);
        }),
    );
    const jsonData = JSON.parse(await data);
    const { paths } = jsonData;
    const temp: Route[] = [];
    for (const key of Object.keys(paths)) {
      const router = new Route();
      const realPath = key.replace(path, '').replace('{', ':').replace('}', '');
      const pathToName = realPath.split('/').join('_');
      router.id = uuidv4();
      router.paths = '{' + realPath + '}';
      router.serviceId = service.id;
      router.wsId = service.wsId;
      router.name = pathToName;
      router.name = pathToName;
      router.stripPath = false;
      router.protocols = '{http,https}';
      router.regexPriority = priority;
      router.priority = priority;
      router.preserveHost = false;
      router.requestBuffering = true;
      router.responseBuffering = true;
      router.createdAt = new Date();
      router.updatedAt = new Date();
      const nestedObj = paths[key];
      let methods = 'OPTIONS';
      if (Object.keys(nestedObj).length > 0) {
        methods =
          Object.keys(nestedObj)
            .map((method) => method.toUpperCase())
            .join(',') + ',OPTIONS';
      }
      router.methods = '{' + methods + '}';
      temp.push(router);
    }
    await this.routeRepository.save(temp);
    return `Done ${temp.length} API.`;
  }
}
