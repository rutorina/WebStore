/**
 * Comprehensive Draw.io Diagram Generator v3.0
 * Створює детальні діаграми для структурно-функціонального та об'єктно-орієнтованого аналізу системи
 * Creates detailed diagrams for structural-functional and object-oriented system analysis
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class ComprehensiveDiagramGenerator {
    constructor() {
        this.cellCounter = 0;
    }

    generateId() {
        return `id_${++this.cellCounter}`;
    }

    escapeXml(text) {
        if (!text) return '';
        return text
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }

    escapeXmlAttribute(text) {
        if (!text) return '';
        return text
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;')
            .replace(/\n/g, '&#10;')
            .replace(/\r/g, '&#13;')
            .replace(/\t/g, '&#9;');
    }

    // 1. FDD - Діаграма функціональної декомпозиції (Function Decomposition Diagram)
    createFDDDiagram() {
        this.cellCounter = 1;
        let content = '';

        // Основна функція системи
        const mainFunction = {
            id: this.generateId(),
            x: 200, y: 50,
            width: 300, height: 80,
            text: 'Система електронного\\nмагазину ТехноСвіт'
        };

        content += `        <mxCell id="${mainFunction.id}" value="${this.escapeXmlAttribute(mainFunction.text)}" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#e1d5e7;strokeColor=#9673a6;fontSize=14;fontStyle=1;" vertex="1" parent="1">
          <mxGeometry x="${mainFunction.x}" y="${mainFunction.y}" width="${mainFunction.width}" height="${mainFunction.height}" as="geometry"/>
        </mxCell>
`;

        // Функції першого рівня
        const level1Functions = [
            { id: this.generateId(), x: 50, y: 200, text: 'Управління\\nкористувачами' },
            { id: this.generateId(), x: 200, y: 200, text: 'Управління\\nкаталогом' },
            { id: this.generateId(), x: 350, y: 200, text: 'Обробка\\nзамовлень' },
            { id: this.generateId(), x: 500, y: 200, text: 'Адміністрування\\nсистеми' }
        ];

        level1Functions.forEach(func => {
            content += `        <mxCell id="${func.id}" value="${this.escapeXmlAttribute(func.text)}" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#dae8fc;strokeColor=#6c8ebf;fontSize=12;" vertex="1" parent="1">
          <mxGeometry x="${func.x}" y="${func.y}" width="120" height="80" as="geometry"/>
        </mxCell>
`;
            // Зв'язок з основною функцією
            content += `        <mxCell id="${this.generateId()}" value="" style="endArrow=classic;html=1;rounded=0;" edge="1" parent="1" source="${mainFunction.id}" target="${func.id}">
          <mxGeometry width="50" height="50" relative="1" as="geometry"/>
        </mxCell>
`;
        });

        // Функції другого рівня для кожної основної функції
        const subFunctions = [
            // Управління користувачами
            [
                { id: this.generateId(), x: 20, y: 350, text: 'Реєстрація\\nкористувачів' },
                { id: this.generateId(), x: 20, y: 450, text: 'Автентифікація' },
                { id: this.generateId(), x: 20, y: 550, text: 'Управління\\nпрофілем' }
            ],
            // Управління каталогом
            [
                { id: this.generateId(), x: 170, y: 350, text: 'Перегляд\\nтоварів' },
                { id: this.generateId(), x: 170, y: 450, text: 'Пошук та\\nфільтрація' },
                { id: this.generateId(), x: 170, y: 550, text: 'Управління\\nкатегоріями' }
            ],
            // Обробка замовлень
            [
                { id: this.generateId(), x: 320, y: 350, text: 'Додавання\\nв кошик' },
                { id: this.generateId(), x: 320, y: 450, text: 'Оформлення\\nзамовлення' },
                { id: this.generateId(), x: 320, y: 550, text: 'Відстеження\\nстатусу' }
            ],
            // Адміністрування системи
            [
                { id: this.generateId(), x: 470, y: 350, text: 'Управління\\nкористувачами' },
                { id: this.generateId(), x: 470, y: 450, text: 'Аналітика та\\nзвітність' },
                { id: this.generateId(), x: 470, y: 550, text: 'Налаштування\\nсистеми' }
            ]
        ];

        subFunctions.forEach((group, groupIndex) => {
            group.forEach(func => {
                const colors = [
                    'fillColor=#fff2cc;strokeColor=#d6b656',
                    'fillColor=#d5e8d4;strokeColor=#82b366',
                    'fillColor=#ffe6cc;strokeColor=#d79b00',
                    'fillColor=#f8cecc;strokeColor=#b85450'
                ];
                
                content += `        <mxCell id="${func.id}" value="${this.escapeXmlAttribute(func.text)}" style="rounded=1;whiteSpace=wrap;html=1;${colors[groupIndex]};fontSize=10;" vertex="1" parent="1">
          <mxGeometry x="${func.x}" y="${func.y}" width="100" height="60" as="geometry"/>
        </mxCell>
`;
                content += `        <mxCell id="${this.generateId()}" value="" style="endArrow=classic;html=1;rounded=0;" edge="1" parent="1" source="${level1Functions[groupIndex].id}" target="${func.id}">
          <mxGeometry width="50" height="50" relative="1" as="geometry"/>
        </mxCell>
`;
            });
        });

        return content;
    }

    // 2. SADT - Діаграма структурного аналізу та проектування (SADT/IDEF0)
    createSADTDiagram() {
        this.cellCounter = 1;
        let content = '';

        // Основний процес A0
        const mainProcess = {
            id: this.generateId(),
            x: 300, y: 250,
            width: 200, height: 100,
            text: 'A0\\n\\nОбробка замовлень\\nв електронному\\nмагазині'
        };

        content += `        <mxCell id="${mainProcess.id}" value="${this.escapeXmlAttribute(mainProcess.text)}" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#e1d5e7;strokeColor=#9673a6;fontSize=12;fontStyle=1;" vertex="1" parent="1">
          <mxGeometry x="${mainProcess.x}" y="${mainProcess.y}" width="${mainProcess.width}" height="${mainProcess.height}" as="geometry"/>
        </mxCell>
`;

        // Вхідні дані (Input)
        const inputs = [
            { id: this.generateId(), x: 50, y: 270, text: 'Запит клієнта' },
            { id: this.generateId(), x: 50, y: 310, text: 'Дані товарів' }
        ];

        inputs.forEach(input => {
            content += `        <mxCell id="${input.id}" value="${this.escapeXmlAttribute(input.text)}" style="text;html=1;align=center;verticalAlign=middle;resizable=0;points=[];autosize=1;fontSize=10;" vertex="1" parent="1">
          <mxGeometry x="${input.x}" y="${input.y}" width="80" height="20" as="geometry"/>
        </mxCell>
`;
            // Стрілка до процесу
            content += `        <mxCell id="${this.generateId()}" value="" style="endArrow=classic;html=1;rounded=0;" edge="1" parent="1" source="${input.id}" target="${mainProcess.id}">
          <mxGeometry width="50" height="50" relative="1" as="geometry"/>
        </mxCell>
`;
        });

        // Вихідні дані (Output)
        const outputs = [
            { id: this.generateId(), x: 650, y: 270, text: 'Підтверджене\\nзамовлення' },
            { id: this.generateId(), x: 650, y: 310, text: 'Рахунок' }
        ];

        outputs.forEach(output => {
            content += `        <mxCell id="${output.id}" value="${this.escapeXmlAttribute(output.text)}" style="text;html=1;align=center;verticalAlign=middle;resizable=0;points=[];autosize=1;fontSize=10;" vertex="1" parent="1">
          <mxGeometry x="${output.x}" y="${output.y}" width="80" height="30" as="geometry"/>
        </mxCell>
`;
            // Стрілка від процесу
            content += `        <mxCell id="${this.generateId()}" value="" style="endArrow=classic;html=1;rounded=0;" edge="1" parent="1" source="${mainProcess.id}" target="${output.id}">
          <mxGeometry width="50" height="50" relative="1" as="geometry"/>
        </mxCell>
`;
        });

        // Управління (Control)
        const controls = [
            { id: this.generateId(), x: 350, y: 150, text: 'Політика\\nкомпанії' },
            { id: this.generateId(), x: 450, y: 150, text: 'Правила\\nоплати' }
        ];

        controls.forEach(control => {
            content += `        <mxCell id="${control.id}" value="${this.escapeXmlAttribute(control.text)}" style="text;html=1;align=center;verticalAlign=middle;resizable=0;points=[];autosize=1;fontSize=10;" vertex="1" parent="1">
          <mxGeometry x="${control.x}" y="${control.y}" width="60" height="30" as="geometry"/>
        </mxCell>
`;
            // Стрілка до процесу зверху
            content += `        <mxCell id="${this.generateId()}" value="" style="endArrow=classic;html=1;rounded=0;" edge="1" parent="1" source="${control.id}" target="${mainProcess.id}">
          <mxGeometry width="50" height="50" relative="1" as="geometry"/>
        </mxCell>
`;
        });

        // Механізми (Mechanisms)
        const mechanisms = [
            { id: this.generateId(), x: 320, y: 400, text: 'Персонал' },
            { id: this.generateId(), x: 400, y: 400, text: 'CRM система' },
            { id: this.generateId(), x: 480, y: 400, text: 'База даних' }
        ];

        mechanisms.forEach(mechanism => {
            content += `        <mxCell id="${mechanism.id}" value="${this.escapeXmlAttribute(mechanism.text)}" style="text;html=1;align=center;verticalAlign=middle;resizable=0;points=[];autosize=1;fontSize=10;" vertex="1" parent="1">
          <mxGeometry x="${mechanism.x}" y="${mechanism.y}" width="70" height="20" as="geometry"/>
        </mxCell>
`;
            // Стрілка до процесу знизу
            content += `        <mxCell id="${this.generateId()}" value="" style="endArrow=classic;html=1;rounded=0;" edge="1" parent="1" source="${mechanism.id}" target="${mainProcess.id}">
          <mxGeometry width="50" height="50" relative="1" as="geometry"/>
        </mxCell>
`;
        });

        // Деталізація процесу A0 на A1-A4
        const subProcesses = [
            { id: this.generateId(), x: 100, y: 500, text: 'A1\\nОтримання\\nзапиту' },
            { id: this.generateId(), x: 250, y: 500, text: 'A2\\nПеревірка\\nналяності' },
            { id: this.generateId(), x: 400, y: 500, text: 'A3\\nОформлення\\nзамовлення' },
            { id: this.generateId(), x: 550, y: 500, text: 'A4\\nОплата та\\nдоставка' }
        ];

        subProcesses.forEach((subProcess, index) => {
            content += `        <mxCell id="${subProcess.id}" value="${this.escapeXmlAttribute(subProcess.text)}" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#dae8fc;strokeColor=#6c8ebf;fontSize=10;" vertex="1" parent="1">
          <mxGeometry x="${subProcess.x}" y="${subProcess.y}" width="120" height="80" as="geometry"/>
        </mxCell>
`;
            // Зв'язки між підпроцесами
            if (index < subProcesses.length - 1) {
                content += `        <mxCell id="${this.generateId()}" value="" style="endArrow=classic;html=1;rounded=0;" edge="1" parent="1" source="${subProcess.id}" target="${subProcesses[index + 1].id}">
          <mxGeometry width="50" height="50" relative="1" as="geometry"/>
        </mxCell>
`;
            }
        });

        return content;
    }

    // 3. DFD - Детальна багаторівнева діаграма потоків даних (Detailed Multi-Level DFD)
    createDFDDiagram() {
        this.cellCounter = 1;
        let content = '';
        
        // ===== РІВЕНЬ 0 - КОНТЕКСТНА ДІАГРАМА =====
        const contextProcess = {
            id: this.generateId(),
            x: 600, y: 200,
            width: 200, height: 200,
            text: '0\\n\\nСистема\\nінтернет-магазину\\nТехноСвіт'
        };

        content += `        <mxCell id="${contextProcess.id}" value="${this.escapeXmlAttribute(contextProcess.text)}" style="ellipse;whiteSpace=wrap;html=1;fillColor=#f8cecc;strokeColor=#b85450;fontSize=14;fontStyle=1;strokeWidth=2;" vertex="1" parent="1">
          <mxGeometry x="${contextProcess.x}" y="${contextProcess.y}" width="${contextProcess.width}" height="${contextProcess.height}" as="geometry"/>
        </mxCell>
`;

        // Зовнішні сутності
        const externalEntities = [
            { id: this.generateId(), x: 50, y: 50, text: 'КЛІЄНТ' },
            { id: this.generateId(), x: 50, y: 200, text: 'АДМІНІСТРАТОР' },
            { id: this.generateId(), x: 50, y: 350, text: 'ПОСТАЧАЛЬНИК' },
            { id: this.generateId(), x: 1150, y: 50, text: 'ПЛАТІЖНА\\nСИСТЕМА' },
            { id: this.generateId(), x: 1150, y: 200, text: 'СЛУЖБА\\nДОСТАВКИ' },
            { id: this.generateId(), x: 1150, y: 350, text: 'EMAIL\\nСЕРВІС' }
        ];

        externalEntities.forEach(entity => {
            content += `        <mxCell id="${entity.id}" value="${this.escapeXmlAttribute(entity.text)}" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#dae8fc;strokeColor=#6c8ebf;fontSize=12;fontStyle=1;strokeWidth=4;align=center;" vertex="1" parent="1">
          <mxGeometry x="${entity.x}" y="${entity.y}" width="140" height="80" as="geometry"/>
        </mxCell>
`;
        });

        // Потоки даних
        const contextFlows = [
            { from: externalEntities[0].id, to: contextProcess.id, label: 'Запити каталогу' },
            { from: contextProcess.id, to: externalEntities[0].id, label: 'Каталог товарів' },
            { from: externalEntities[1].id, to: contextProcess.id, label: 'Управління' },
            { from: contextProcess.id, to: externalEntities[1].id, label: 'Звіти' },
            { from: externalEntities[2].id, to: contextProcess.id, label: 'Дані товарів' },
            { from: contextProcess.id, to: externalEntities[3].id, label: 'Запит оплати' },
            { from: externalEntities[3].id, to: contextProcess.id, label: 'Статус платежу' },
            { from: contextProcess.id, to: externalEntities[4].id, label: 'Дані доставки' },
            { from: externalEntities[4].id, to: contextProcess.id, label: 'Статус доставки' },
            { from: contextProcess.id, to: externalEntities[5].id, label: 'Повідомлення' }
        ];

        contextFlows.forEach(flow => {
            content += `        <mxCell id="${this.generateId()}" value="${this.escapeXmlAttribute(flow.label)}" style="endArrow=classic;html=1;rounded=0;fontSize=10;labelBackgroundColor=#ffffff;strokeWidth=2;" edge="1" parent="1" source="${flow.from}" target="${flow.to}">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
`;
        });

        // ===== РІВЕНЬ 1 - ОСНОВНІ ПРОЦЕСИ =====
        const level1Processes = [
            { id: this.generateId(), x: 200, y: 600, text: '1\\n\\nУправління\\nкористувачами' },
            { id: this.generateId(), x: 400, y: 600, text: '2\\n\\nУправління\\nкаталогом' },
            { id: this.generateId(), x: 600, y: 600, text: '3\\n\\nОбробка\\nзамовлень' },
            { id: this.generateId(), x: 800, y: 600, text: '4\\n\\nПлатіжна\\nобробка' },
            { id: this.generateId(), x: 1000, y: 600, text: '5\\n\\nДоставка' }
        ];

        level1Processes.forEach(process => {
            content += `        <mxCell id="${process.id}" value="${this.escapeXmlAttribute(process.text)}" style="ellipse;whiteSpace=wrap;html=1;fillColor=#d5e8d4;strokeColor=#82b366;fontSize=12;fontStyle=1;strokeWidth=2;" vertex="1" parent="1">
          <mxGeometry x="${process.x}" y="${process.y}" width="140" height="140" as="geometry"/>
        </mxCell>
`;
        });

        // Сховища даних
        const dataStores = [
            { id: this.generateId(), x: 300, y: 800, text: 'D1 | Користувачі' },
            { id: this.generateId(), x: 500, y: 800, text: 'D2 | Товари' },
            { id: this.generateId(), x: 700, y: 800, text: 'D3 | Замовлення' },
            { id: this.generateId(), x: 900, y: 800, text: 'D4 | Платежі' }
        ];

        dataStores.forEach(store => {
            content += `        <mxCell id="${store.id}" value="${this.escapeXmlAttribute(store.text)}" style="shape=partialRectangle;whiteSpace=wrap;html=1;left=0;right=0;fillColor=#f5f5f5;strokeColor=#666666;fontSize=11;fontStyle=1;align=left;spacingLeft=10;" vertex="1" parent="1">
          <mxGeometry x="${store.x}" y="${store.y}" width="160" height="40" as="geometry"/>
        </mxCell>
`;
        });

        // Потоки між процесами та сховищами
        const level1Flows = [
            { from: level1Processes[0].id, to: dataStores[0].id, label: 'Дані користувача' },
            { from: dataStores[0].id, to: level1Processes[0].id, label: 'Профіль' },
            { from: level1Processes[1].id, to: dataStores[1].id, label: 'Оновлення товару' },
            { from: dataStores[1].id, to: level1Processes[1].id, label: 'Каталог' },
            { from: level1Processes[2].id, to: dataStores[2].id, label: 'Нове замовлення' },
            { from: dataStores[2].id, to: level1Processes[2].id, label: 'Історія' },
            { from: level1Processes[3].id, to: dataStores[3].id, label: 'Транзакція' }
        ];

        level1Flows.forEach(flow => {
            content += `        <mxCell id="${this.generateId()}" value="${this.escapeXmlAttribute(flow.label)}" style="endArrow=classic;html=1;rounded=0;fontSize=9;labelBackgroundColor=#ffffff;strokeWidth=1;" edge="1" parent="1" source="${flow.from}" target="${flow.to}">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
`;
        });

        return content;
    }
            content += `        <mxCell id="${this.generateId()}" value="${this.escapeXmlAttribute(flow.label)}" style="endArrow=classic;html=1;rounded=0;fontSize=10;labelBackgroundColor=#ffffff;strokeWidth=2;" edge="1" parent="1" source="${flow.from}" target="${flow.to}">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
`;
        });

        // РІВЕНЬ 1 - Декомпозиція основного процесу
        content += `        <mxCell id="${this.generateId()}" value="РІВЕНЬ 1 - Декомпозиція процесу" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;rounded=0;fontSize=16;fontStyle=1;" vertex="1" parent="1">
          <mxGeometry x="400" y="800" width="280" height="40" as="geometry"/>
        </mxCell>
`;

        // Процеси рівня 1
        const level1Processes = [
            { id: this.generateId(), x: 200, y: 900, text: '1\\nАутентифікація\\nта авторизація' },
            { id: this.generateId(), x: 400, y: 900, text: '2\\nУправління\\nкаталогом' },
            { id: this.generateId(), x: 600, y: 900, text: '3\\nОбробка\\nзамовлень' },
            { id: this.generateId(), x: 800, y: 900, text: '4\\nУправління\\nплатежами' }
        ];

        level1Processes.forEach(process => {
            content += `        <mxCell id="${process.id}" value="${this.escapeXmlAttribute(process.text)}" style="ellipse;whiteSpace=wrap;html=1;fillColor=#fff2cc;strokeColor=#d6b656;fontSize=11;fontStyle=1;" vertex="1" parent="1">
          <mxGeometry x="${process.x}" y="${process.y}" width="120" height="100" as="geometry"/>
        </mxCell>
`;
        });

        // Сховища даних - відкриті прямокутники (правильний DFD стандарт)
        const dataStores = [
            { id: this.generateId(), x: 150, y: 1100, text: 'D1 | Користувачі' },
            { id: this.generateId(), x: 350, y: 1100, text: 'D2 | Товари' },
            { id: this.generateId(), x: 550, y: 1100, text: 'D3 | Замовлення' },
            { id: this.generateId(), x: 750, y: 1100, text: 'D4 | Платежі' }
        ];

        dataStores.forEach(store => {
            content += `        <mxCell id="${store.id}" value="${this.escapeXmlAttribute(store.text)}" style="shape=partialRectangle;whiteSpace=wrap;html=1;left=0;right=0;fillColor=#f5f5f5;strokeColor=#666666;fontSize=11;fontStyle=1;" vertex="1" parent="1">
          <mxGeometry x="${store.x}" y="${store.y}" width="140" height="40" as="geometry"/>
        </mxCell>
`;
        });

        // Потоки між процесами рівня 1 та сховищами
        const level1Flows = [
            // Процес 1 з сховищем D1
            { from: level1Processes[0].id, to: dataStores[0].id, label: 'Дані користувачів' },
            { from: dataStores[0].id, to: level1Processes[0].id, label: 'Облікові записи' },
            // Процес 2 з сховищем D2
            { from: level1Processes[1].id, to: dataStores[1].id, label: 'Нові товари' },
            { from: dataStores[1].id, to: level1Processes[1].id, label: 'Каталог товарів' },
            // Процес 3 з сховищем D3
            { from: level1Processes[2].id, to: dataStores[2].id, label: 'Замовлення' },
            { from: dataStores[2].id, to: level1Processes[2].id, label: 'Історія замовлень' },
            // Процес 4 з сховищем D4
            { from: level1Processes[3].id, to: dataStores[3].id, label: 'Транзакції' },
            { from: dataStores[3].id, to: level1Processes[3].id, label: 'Платіжні дані' }
        ];

        level1Flows.forEach(flow => {
            content += `        <mxCell id="${this.generateId()}" value="${this.escapeXmlAttribute(flow.label)}" style="endArrow=classic;html=1;rounded=0;fontSize=9;labelBackgroundColor=#ffffff;strokeWidth=1;" edge="1" parent="1" source="${flow.from}" target="${flow.to}">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
`;
        });

        // РІВЕНЬ 2 - Детальна декомпозиція процесу 3 (Обробка замовлень)
        content += `        <mxCell id="${this.generateId()}" value="РІВЕНЬ 2 - Декомпозиція процесу 3 (Обробка замовлень)" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;rounded=0;fontSize=16;fontStyle=1;" vertex="1" parent="1">
          <mxGeometry x="300" y="1250" width="480" height="40" as="geometry"/>
        </mxCell>
`;

        const level2Processes = [
            { id: this.generateId(), x: 200, y: 1350, text: '3.1\\nВалідація\\nзамовлення' },
            { id: this.generateId(), x: 400, y: 1350, text: '3.2\\nРозрахунок\\nвартості' },
            { id: this.generateId(), x: 600, y: 1350, text: '3.3\\nРезервування\\nтоварів' },
            { id: this.generateId(), x: 800, y: 1350, text: '3.4\\nФормування\\nзамовлення' }
        ];

        level2Processes.forEach(process => {
            content += `        <mxCell id="${process.id}" value="${this.escapeXmlAttribute(process.text)}" style="ellipse;whiteSpace=wrap;html=1;fillColor=#d5e8d4;strokeColor=#82b366;fontSize=10;fontStyle=1;" vertex="1" parent="1">
          <mxGeometry x="${process.x}" y="${process.y}" width="100" height="80" as="geometry"/>
        </mxCell>
`;
        });

        // Потоки між процесами рівня 2
        const level2Flows = [
            { from: level2Processes[0].id, to: level2Processes[1].id, label: 'Валідні дані' },
            { from: level2Processes[1].id, to: level2Processes[2].id, label: 'Підтверджена вартість' },
            { from: level2Processes[2].id, to: level2Processes[3].id, label: 'Зарезервовані товари' }
        ];

        level2Flows.forEach(flow => {
            content += `        <mxCell id="${this.generateId()}" value="${this.escapeXmlAttribute(flow.label)}" style="endArrow=classic;html=1;rounded=0;fontSize=9;labelBackgroundColor=#ffffff;strokeWidth=1;" edge="1" parent="1" source="${flow.from}" target="${flow.to}">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
`;
        });

        return content;
    }

    // 2. ER Діаграма - Діаграма "сутність-зв'язок" (Entity-Relationship Diagram)
    createERDiagram() {
        this.cellCounter = 1;
        let content = '';

        // Users Entity
        const entities = [
            {
                id: this.generateId(),
                x: 50, y: 50, width: 220, height: 260,
                name: 'Users (Користувачі)',
                color: 'fillColor=#dae8fc;strokeColor=#6c8ebf',
                attributes: [
                    'id (PK, INT, AUTO_INCREMENT)',
                    'name (VARCHAR(100), NOT NULL)',
                    'email (VARCHAR(150), UNIQUE, NOT NULL)',
                    'email_verified_at (TIMESTAMP)',
                    'password (VARCHAR(255), NOT NULL)',
                    'is_admin (BOOLEAN, DEFAULT FALSE)',
                    'phone (VARCHAR(20))',
                    'address (TEXT)',
                    'created_at (TIMESTAMP)',
                    'updated_at (TIMESTAMP)'
                ]
            },
            {
                id: this.generateId(),
                x: 320, y: 50, width: 240, height: 280,
                name: 'Categories (Категорії)',
                color: 'fillColor=#d5e8d4;strokeColor=#82b366',
                attributes: [
                    'id (PK, INT, AUTO_INCREMENT)',
                    'name_uk (VARCHAR(100), NOT NULL)',
                    'name_en (VARCHAR(100), NOT NULL)',
                    'slug (VARCHAR(150), UNIQUE, NOT NULL)',
                    'description_uk (TEXT)',
                    'description_en (TEXT)',
                    'image_url (VARCHAR(255))',
                    'parent_id (FK → Categories.id)',
                    'sort_order (INT, DEFAULT 0)',
                    'is_active (BOOLEAN, DEFAULT TRUE)',
                    'created_at (TIMESTAMP)',
                    'updated_at (TIMESTAMP)'
                ]
            },
            {
                id: this.generateId(),
                x: 600, y: 50, width: 260, height: 420,
                name: 'Products (Товари)',
                color: 'fillColor=#ffe6cc;strokeColor=#d79b00',
                attributes: [
                    'id (PK, INT, AUTO_INCREMENT)',
                    'category_id (FK → Categories.id)',
                    'name_uk (VARCHAR(200), NOT NULL)',
                    'name_en (VARCHAR(200), NOT NULL)',
                    'slug (VARCHAR(250), UNIQUE, NOT NULL)',
                    'description_uk (TEXT)',
                    'description_en (TEXT)',
                    'price (DECIMAL(10,2), NOT NULL)',
                    'sale_price (DECIMAL(10,2))',
                    'stock_quantity (INT, DEFAULT 0)',
                    'sku (VARCHAR(100), UNIQUE)',
                    'weight (DECIMAL(8,2))',
                    'dimensions (VARCHAR(100))',
                    'brand (VARCHAR(100))',
                    'model (VARCHAR(100))',
                    'warranty_months (INT)',
                    'is_active (BOOLEAN, DEFAULT TRUE)',
                    'is_featured (BOOLEAN, DEFAULT FALSE)',
                    'created_at (TIMESTAMP)',
                    'updated_at (TIMESTAMP)'
                ]
            },
            {
                id: this.generateId(),
                x: 50, y: 350, width: 240, height: 320,
                name: 'Orders (Замовлення)',
                color: 'fillColor=#f8cecc;strokeColor=#b85450',
                attributes: [
                    'id (PK, INT, AUTO_INCREMENT)',
                    'user_id (FK → Users.id)',
                    'order_number (VARCHAR(50), UNIQUE)',
                    'status (ENUM: pending, confirmed, shipped, delivered, cancelled)',
                    'total_amount (DECIMAL(10,2), NOT NULL)',
                    'shipping_cost (DECIMAL(8,2))',
                    'tax_amount (DECIMAL(8,2))',
                    'discount_amount (DECIMAL(8,2))',
                    'payment_method (VARCHAR(50))',
                    'payment_status (ENUM: pending, paid, failed, refunded)',
                    'shipping_address (JSON)',
                    'billing_address (JSON)',
                    'notes (TEXT)',
                    'shipped_at (TIMESTAMP)',
                    'delivered_at (TIMESTAMP)',
                    'created_at (TIMESTAMP)',
                    'updated_at (TIMESTAMP)'
                ]
            },
            {
                id: this.generateId(),
                x: 320, y: 380, width: 240, height: 220,
                name: 'Order_Items (Позиції замовлення)',
                color: 'fillColor=#e1d5e7;strokeColor=#9673a6',
                attributes: [
                    'id (PK, INT, AUTO_INCREMENT)',
                    'order_id (FK → Orders.id)',
                    'product_id (FK → Products.id)',
                    'quantity (INT, NOT NULL)',
                    'unit_price (DECIMAL(10,2), NOT NULL)',
                    'total_price (DECIMAL(10,2), NOT NULL)',
                    'product_snapshot (JSON)',
                    'created_at (TIMESTAMP)',
                    'updated_at (TIMESTAMP)'
                ]
            }
        ];

        // Create entities
        entities.forEach(entity => {
            content += `        <mxCell id="${entity.id}" value="${this.escapeXmlAttribute(entity.name)}" style="swimlane;fontStyle=1;childLayout=stackLayout;horizontal=1;startSize=26;${entity.color};fontSize=12;" vertex="1" parent="1">
          <mxGeometry x="${entity.x}" y="${entity.y}" width="${entity.width}" height="${entity.height}" as="geometry"/>
        </mxCell>
`;

            entity.attributes.forEach((attr, index) => {
                let style = '';
                if (attr.includes('PK')) style = 'fontStyle=4;';
                else if (attr.includes('FK')) style = 'fontStyle=2;';

                const fontSize = entity.width > 240 ? '9' : '10';
                const rowHeight = entity.width > 240 ? '19' : '21';

                content += `        <mxCell id="${this.generateId()}" value="${this.escapeXmlAttribute(attr)}" style="text;strokeColor=none;fillColor=none;align=left;verticalAlign=top;spacingLeft=4;spacingRight=4;overflow=hidden;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;${style}fontSize=${fontSize};" vertex="1" parent="${entity.id}">
          <mxGeometry y="${26 + index * rowHeight}" width="${entity.width}" height="${rowHeight}" as="geometry"/>
        </mxCell>
`;
            });
        });

        // Relationships
        const relationships = [
            { from: entities[1].id, to: entities[2].id, fromLabel: '1', toLabel: 'M', description: 'має' },
            { from: entities[0].id, to: entities[3].id, fromLabel: '1', toLabel: 'M', description: 'створює' },
            { from: entities[3].id, to: entities[4].id, fromLabel: '1', toLabel: 'M', description: 'містить' },
            { from: entities[2].id, to: entities[4].id, fromLabel: '1', toLabel: 'M', description: 'входить в' }
        ];

        relationships.forEach((rel, index) => {
            content += `        <mxCell id="${this.generateId()}" value="" style="endArrow=none;html=1;rounded=0;" edge="1" parent="1" source="${rel.from}" target="${rel.to}">
          <mxGeometry width="50" height="50" relative="1" as="geometry"/>
        </mxCell>
`;
            
            // Add cardinality labels
            const labelPositions = [
                { x: 570, y: 180 }, // Categories to Products
                { x: 150, y: 320 }, // Users to Orders
                { x: 300, y: 490 }, // Orders to Order_Items
                { x: 580, y: 450 }  // Products to Order_Items
            ];

            if (labelPositions[index]) {
                content += `        <mxCell id="${this.generateId()}" value="${rel.fromLabel}" style="text;html=1;align=center;verticalAlign=middle;resizable=0;points=[];autosize=1;fontSize=12;fontStyle=1;" vertex="1" parent="1">
          <mxGeometry x="${labelPositions[index].x}" y="${labelPositions[index].y}" width="20" height="20" as="geometry"/>
        </mxCell>
        <mxCell id="${this.generateId()}" value="${rel.toLabel}" style="text;html=1;align=center;verticalAlign=middle;resizable=0;points=[];autosize=1;fontSize=12;fontStyle=1;" vertex="1" parent="1">
          <mxGeometry x="${labelPositions[index].x + 20}" y="${labelPositions[index].y}" width="20" height="20" as="geometry"/>
        </mxCell>
`;
            }
        });

        return content;
    }

    // 5. BPMN - Розширена діаграма бізнес-процесів (Enhanced Business Process Model and Notation)
    // 5. BPMN - Діаграма бізнес-процесів (Business Process Model and Notation) - Wikipedia Standard
    createBPMNDiagram() {
        this.cellCounter = 1;
        let content = '';

        // Pools (учасники процесу) - за стандартом BPMN 2.0
        const pools = [
            { id: this.generateId(), x: 50, y: 50, width: 1200, height: 180, text: 'Клієнт' },
            { id: this.generateId(), x: 50, y: 250, width: 1200, height: 200, text: 'Система магазину' },
            { id: this.generateId(), x: 50, y: 470, width: 1200, height: 120, text: 'Платіжна система' },
            { id: this.generateId(), x: 50, y: 610, width: 1200, height: 120, text: 'Служба доставки' }
        ];

        pools.forEach(pool => {
            content += `        <mxCell id="${pool.id}" value="${this.escapeXmlAttribute(pool.text)}" style="swimlane;html=1;childLayout=stackLayout;resizeParent=1;resizeParentMax=0;horizontal=0;fillColor=#e1d5e7;strokeColor=#9673a6;fontSize=12;fontStyle=1;" vertex="1" parent="1">
          <mxGeometry x="${pool.x}" y="${pool.y}" width="${pool.width}" height="${pool.height}" as="geometry"/>
        </mxCell>
`;
        });

        // Start Event - клієнт (коло з тонкою лінією)
        const startEvent = { id: this.generateId(), x: 120, y: 120, text: 'Потреба\\nв товарі' };
        content += `        <mxCell id="${startEvent.id}" value="${this.escapeXmlAttribute(startEvent.text)}" style="ellipse;whiteSpace=wrap;html=1;fillColor=#d5e8d4;strokeColor=#82b366;fontSize=10;" vertex="1" parent="${pools[0].id}">
          <mxGeometry x="70" y="60" width="60" height="60" as="geometry"/>
        </mxCell>
`;

        // Tasks (діяльності) - прямокутники з заокругленими кутами
        const customerTasks = [
            { id: this.generateId(), x: 220, y: 120, text: 'Пошук\\nтоварів' },
            { id: this.generateId(), x: 320, y: 120, text: 'Вибір\\nтовару' },
            { id: this.generateId(), x: 420, y: 120, text: 'Оформлення\\nзамовлення' },
            { id: this.generateId(), x: 620, y: 120, text: 'Оплата\\nзамовлення' },
            { id: this.generateId(), x: 920, y: 120, text: 'Отримання\\nтовару' }
        ];

        customerTasks.forEach(task => {
            content += `        <mxCell id="${task.id}" value="${this.escapeXmlAttribute(task.text)}" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#fff2cc;strokeColor=#d6b656;fontSize=10;" vertex="1" parent="${pools[0].id}">
          <mxGeometry x="${task.x - pools[0].x}" y="60" width="80" height="60" as="geometry"/>
        </mxCell>
`;
        });

        // System Tasks
        const systemTasks = [
            { id: this.generateId(), x: 220, y: 320, text: 'Відображення\\nкаталогу' },
            { id: this.generateId(), x: 320, y: 320, text: 'Показ деталей\\nтовару' },
            { id: this.generateId(), x: 420, y: 320, text: 'Створення\\nзамовлення' },
            { id: this.generateId(), x: 520, y: 320, text: 'Валідація\\nданих' },
            { id: this.generateId(), x: 720, y: 320, text: 'Підтвердження\\nплатежу' },
            { id: this.generateId(), x: 820, y: 320, text: 'Підготовка\\nдо відправки' },
            { id: this.generateId(), x: 920, y: 320, text: 'Оновлення\\nстатусу' }
        ];

        systemTasks.forEach(task => {
            content += `        <mxCell id="${task.id}" value="${this.escapeXmlAttribute(task.text)}" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#dae8fc;strokeColor=#6c8ebf;fontSize=10;" vertex="1" parent="${pools[1].id}">
          <mxGeometry x="${task.x - pools[1].x}" y="70" width="80" height="60" as="geometry"/>
        </mxCell>
`;
        });

        // Gateway (Decision) - ромб
        const gateway = { id: this.generateId(), x: 520, y: 130, text: 'Товар\\nдоступний?' };
        content += `        <mxCell id="${gateway.id}" value="${this.escapeXmlAttribute(gateway.text)}" style="rhombus;whiteSpace=wrap;html=1;fillColor=#ffe6cc;strokeColor=#d79b00;fontSize=9;" vertex="1" parent="${pools[0].id}">
          <mxGeometry x="${gateway.x - pools[0].x}" y="50" width="80" height="80" as="geometry"/>
        </mxCell>
`;

        // Payment Service Tasks
        const paymentTasks = [
            { id: this.generateId(), x: 620, y: 520, text: 'Обробка\\nплатежу' },
            { id: this.generateId(), x: 720, y: 520, text: 'Підтвердження\\nтранзакції' }
        ];

        paymentTasks.forEach(task => {
            content += `        <mxCell id="${task.id}" value="${this.escapeXmlAttribute(task.text)}" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#d5e8d4;strokeColor=#82b366;fontSize=10;" vertex="1" parent="${pools[2].id}">
          <mxGeometry x="${task.x - pools[2].x}" y="30" width="80" height="60" as="geometry"/>
        </mxCell>
`;
        });

        // Shipping Service Tasks
        const shippingTasks = [
            { id: this.generateId(), x: 820, y: 660, text: 'Планування\\nдоставки' },
            { id: this.generateId(), x: 920, y: 660, text: 'Доставка\\nтовару' }
        ];

        shippingTasks.forEach(task => {
            content += `        <mxCell id="${task.id}" value="${this.escapeXmlAttribute(task.text)}" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#f8cecc;strokeColor=#b85450;fontSize=10;" vertex="1" parent="${pools[3].id}">
          <mxGeometry x="${task.x - pools[3].x}" y="30" width="80" height="60" as="geometry"/>
        </mxCell>
`;
        });

        // End Event - товар отримано (коло з товстою лінією)
        const endEvent = { id: this.generateId(), x: 1020, y: 120, text: 'Товар\\nотримано' };
        content += `        <mxCell id="${endEvent.id}" value="${this.escapeXmlAttribute(endEvent.text)}" style="ellipse;whiteSpace=wrap;html=1;fillColor=#f8cecc;strokeColor=#b85450;fontSize=10;strokeWidth=3;" vertex="1" parent="${pools[0].id}">
          <mxGeometry x="970" y="60" width="60" height="60" as="geometry"/>
        </mxCell>
`;

        // Sequence Flows (послідовні потоки) - стрілки
        const sequenceFlows = [
            // Customer pool flows
            { from: startEvent.id, to: customerTasks[0].id },
            { from: customerTasks[0].id, to: customerTasks[1].id },
            { from: customerTasks[1].id, to: customerTasks[2].id },
            { from: customerTasks[2].id, to: gateway.id },
            { from: gateway.id, to: customerTasks[3].id, label: 'Так' },
            { from: customerTasks[3].id, to: customerTasks[4].id },
            { from: customerTasks[4].id, to: endEvent.id },
            
            // System flows
            { from: systemTasks[0].id, to: systemTasks[1].id },
            { from: systemTasks[1].id, to: systemTasks[2].id },
            { from: systemTasks[2].id, to: systemTasks[3].id },
            { from: systemTasks[4].id, to: systemTasks[5].id },
            { from: systemTasks[5].id, to: systemTasks[6].id },
            
            // Payment flows
            { from: paymentTasks[0].id, to: paymentTasks[1].id },
            
            // Shipping flows
            { from: shippingTasks[0].id, to: shippingTasks[1].id }
        ];

        sequenceFlows.forEach(flow => {
            const label = flow.label ? `labelBackgroundColor=#ffffff;` : '';
            content += `        <mxCell id="${this.generateId()}" value="${this.escapeXmlAttribute(flow.label || '')}" style="endArrow=classic;html=1;rounded=0;fontSize=10;${label}strokeWidth=2;" edge="1" parent="1" source="${flow.from}" target="${flow.to}">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
`;
        });

        // Message Flows (потоки повідомлень) - пунктирні лінії між pools
        const messageFlows = [
            { from: customerTasks[0].id, to: systemTasks[0].id, label: 'Запит каталогу' },
            { from: customerTasks[1].id, to: systemTasks[1].id, label: 'Запит деталей' },
            { from: customerTasks[2].id, to: systemTasks[2].id, label: 'Дані замовлення' },
            { from: customerTasks[3].id, to: paymentTasks[0].id, label: 'Запит оплати' },
            { from: paymentTasks[1].id, to: systemTasks[4].id, label: 'Підтвердження' },
            { from: systemTasks[5].id, to: shippingTasks[0].id, label: 'Заявка доставки' },
            { from: shippingTasks[1].id, to: systemTasks[6].id, label: 'Статус доставки' }
        ];

        messageFlows.forEach(flow => {
            content += `        <mxCell id="${this.generateId()}" value="${this.escapeXmlAttribute(flow.label)}" style="endArrow=classic;html=1;rounded=0;fontSize=9;strokeStyle=dashed;labelBackgroundColor=#ffffff;strokeWidth=1;" edge="1" parent="1" source="${flow.from}" target="${flow.to}">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
`;
        });

        // Data Objects (об'єкти даних) - прямокутники з загнутим кутом
        const dataObjects = [
            { id: this.generateId(), x: 150, y: 400, text: 'Каталог\\nтоварів' },
            { id: this.generateId(), x: 450, y: 400, text: 'Замовлення' },
            { id: this.generateId(), x: 750, y: 400, text: 'Чек оплати' }
        ];

        dataObjects.forEach(obj => {
            content += `        <mxCell id="${obj.id}" value="${this.escapeXmlAttribute(obj.text)}" style="shape=note;whiteSpace=wrap;html=1;fillColor=#f5f5f5;strokeColor=#666666;fontSize=10;size=20;" vertex="1" parent="1">
          <mxGeometry x="${obj.x}" y="${obj.y}" width="80" height="60" as="geometry"/>
        </mxCell>
`;
        });

        // Data Associations (асоціації даних) - пунктирні лінії до об'єктів даних
        const dataAssociations = [
            { from: systemTasks[0].id, to: dataObjects[0].id },
            { from: systemTasks[2].id, to: dataObjects[1].id },
            { from: paymentTasks[1].id, to: dataObjects[2].id }
        ];

        dataAssociations.forEach(assoc => {
            content += `        <mxCell id="${this.generateId()}" value="" style="endArrow=none;html=1;rounded=0;strokeStyle=dotted;strokeWidth=1;" edge="1" parent="1" source="${assoc.from}" target="${assoc.to}">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
`;
        });

        return content;
    }
    // 6. Use Case Діаграма - Діаграма варіантів використання
    createUseCaseDiagram() {
        this.cellCounter = 1;
        let content = '';

        // Акторів із розширеними ролями
        const actors = [
            { id: this.generateId(), x: 50, y: 120, text: 'Незареєстрований\\nвідвідувач' },
            { id: this.generateId(), x: 50, y: 220, text: 'Зареєстрований\\nклієнт' },
            { id: this.generateId(), x: 50, y: 320, text: 'VIP клієнт' },
            { id: this.generateId(), x: 50, y: 420, text: 'Модератор\\nконтенту' },
            { id: this.generateId(), x: 50, y: 520, text: 'Менеджер\\nзамовлень' },
            { id: this.generateId(), x: 50, y: 620, text: 'Адміністратор\\nсистеми' },
            { id: this.generateId(), x: 900, y: 150, text: 'Платіжна\\nсистема' },
            { id: this.generateId(), x: 900, y: 250, text: 'Email\\nсервіс' },
            { id: this.generateId(), x: 900, y: 350, text: 'SMS\\nсервіс' },
            { id: this.generateId(), x: 900, y: 450, text: 'Служба\\nдоставки' },
            { id: this.generateId(), x: 900, y: 550, text: 'Складська\\nсистема' }
        ];

        actors.forEach(actor => {
            content += `        <mxCell id="${actor.id}" value="${this.escapeXmlAttribute(actor.text)}" style="shape=umlActor;verticalLabelPosition=bottom;verticalAlign=top;html=1;outlineConnect=0;fillColor=#dae8fc;strokeColor=#6c8ebf;fontSize=10;" vertex="1" parent="1">
          <mxGeometry x="${actor.x}" y="${actor.y}" width="40" height="80" as="geometry"/>
        </mxCell>
`;
        });

        // Прецеденти з деталізацією
        const useCases = [
            // Базова функціональність (відвідувачі)
            { id: this.generateId(), x: 200, y: 80, text: 'Перегляд каталогу\\nтоварів', color: '#fff2cc', category: 'basic' },
            { id: this.generateId(), x: 200, y: 160, text: 'Пошук товарів\\nза назвою', color: '#fff2cc', category: 'basic' },
            { id: this.generateId(), x: 200, y: 240, text: 'Фільтрація\\nза категоріями', color: '#fff2cc', category: 'basic' },
            { id: this.generateId(), x: 350, y: 120, text: 'Порівняння\\nтоварів', color: '#fff2cc', category: 'basic' },
            { id: this.generateId(), x: 350, y: 200, text: 'Читання\\nвідгуків', color: '#fff2cc', category: 'basic' },
            
            // Функціональність користувачів
            { id: this.generateId(), x: 500, y: 180, text: 'Реєстрація\\nкористувача', color: '#d5e8d4', category: 'user' },
            { id: this.generateId(), x: 500, y: 260, text: 'Авторизація\\nв системі', color: '#d5e8d4', category: 'user' },
            { id: this.generateId(), x: 650, y: 120, text: 'Управління\\nпрофілем', color: '#d5e8d4', category: 'user' },
            { id: this.generateId(), x: 650, y: 200, text: 'Додавання\\nв кошик', color: '#d5e8d4', category: 'user' },
            { id: this.generateId(), x: 650, y: 280, text: 'Управління\\nкошиком', color: '#d5e8d4', category: 'user' },
            { id: this.generateId(), x: 650, y: 360, text: 'Оформлення\\nзамовлення', color: '#d5e8d4', category: 'user' },
            { id: this.generateId(), x: 800, y: 200, text: 'Відстеження\\nзамовлення', color: '#d5e8d4', category: 'user' },
            { id: this.generateId(), x: 800, y: 280, text: 'Історія\\nзамовлень', color: '#d5e8d4', category: 'user' },
            { id: this.generateId(), x: 800, y: 360, text: 'Написання\\nвідгуків', color: '#d5e8d4', category: 'user' },
            
            // VIP функціональність
            { id: this.generateId(), x: 500, y: 340, text: 'Отримання\\nVIP знижок', color: '#e1d5e7', category: 'vip' },
            { id: this.generateId(), x: 500, y: 420, text: 'Приоритетна\\nпідтримка', color: '#e1d5e7', category: 'vip' },
            
            // Модерація контенту
            { id: this.generateId(), x: 200, y: 450, text: 'Модерація\\nвідгуків', color: '#ffe6cc', category: 'moderation' },
            { id: this.generateId(), x: 200, y: 530, text: 'Управління\\nконтентом', color: '#ffe6cc', category: 'moderation' },
            
            // Менеджмент замовлень
            { id: this.generateId(), x: 350, y: 480, text: 'Обробка\\nзамовлень', color: '#f8cecc', category: 'management' },
            { id: this.generateId(), x: 350, y: 560, text: 'Управління\\nстатусами', color: '#f8cecc', category: 'management' },
            { id: this.generateId(), x: 500, y: 520, text: 'Генерація\\nзвітів', color: '#f8cecc', category: 'management' },
            
            // Адміністрування
            { id: this.generateId(), x: 650, y: 480, text: 'Управління\\nтоварами', color: '#ffcccc', category: 'admin' },
            { id: this.generateId(), x: 650, y: 560, text: 'Управління\\nкатегоріями', color: '#ffcccc', category: 'admin' },
            { id: this.generateId(), x: 650, y: 640, text: 'Управління\\nкористувачами', color: '#ffcccc', category: 'admin' },
            { id: this.generateId(), x: 800, y: 520, text: 'Налаштування\\nсистеми', color: '#ffcccc', category: 'admin' },
            { id: this.generateId(), x: 800, y: 600, text: 'Резервне\\nкопіювання', color: '#ffcccc', category: 'admin' }
        ];

        useCases.forEach(uc => {
            content += `        <mxCell id="${uc.id}" value="${this.escapeXmlAttribute(uc.text)}" style="ellipse;whiteSpace=wrap;html=1;fillColor=${uc.color};strokeColor=#666666;fontSize=10;" vertex="1" parent="1">
          <mxGeometry x="${uc.x}" y="${uc.y}" width="120" height="60" as="geometry"/>
        </mxCell>
`;
        });

        // Межі системи
        content += `        <mxCell id="${this.generateId()}" value="Система електронного магазину ТехноСвіт" style="rounded=0;whiteSpace=wrap;html=1;fillColor=none;strokeColor=#000000;strokeWidth=2;dashed=1;fontSize=14;fontStyle=1;verticalAlign=top;" vertex="1" parent="1">
          <mxGeometry x="180" y="60" width="760" height="640" as="geometry"/>
        </mxCell>
`;

        // Зв'язки між акторами та прецедентами
        const actorUseCaseRelations = [
            // Незареєстрований відвідувач
            { from: actors[0].id, to: useCases[0].id, type: 'association' },
            { from: actors[0].id, to: useCases[1].id, type: 'association' },
            { from: actors[0].id, to: useCases[2].id, type: 'association' },
            { from: actors[0].id, to: useCases[3].id, type: 'association' },
            { from: actors[0].id, to: useCases[4].id, type: 'association' },
            { from: actors[0].id, to: useCases[5].id, type: 'association' },
            
            // Зареєстрований клієнт (успадковує від відвідувача + власні)
            { from: actors[1].id, to: useCases[6].id, type: 'association' },
            { from: actors[1].id, to: useCases[7].id, type: 'association' },
            { from: actors[1].id, to: useCases[8].id, type: 'association' },
            { from: actors[1].id, to: useCases[9].id, type: 'association' },
            { from: actors[1].id, to: useCases[10].id, type: 'association' },
            { from: actors[1].id, to: useCases[11].id, type: 'association' },
            { from: actors[1].id, to: useCases[12].id, type: 'association' },
            { from: actors[1].id, to: useCases[13].id, type: 'association' },
            
            // VIP клієнт
            { from: actors[2].id, to: useCases[14].id, type: 'association' },
            { from: actors[2].id, to: useCases[15].id, type: 'association' },
            
            // Модератор контенту
            { from: actors[3].id, to: useCases[16].id, type: 'association' },
            { from: actors[3].id, to: useCases[17].id, type: 'association' },
            
            // Менеджер замовлень
            { from: actors[4].id, to: useCases[18].id, type: 'association' },
            { from: actors[4].id, to: useCases[19].id, type: 'association' },
            { from: actors[4].id, to: useCases[20].id, type: 'association' },
            
            // Адміністратор системи
            { from: actors[5].id, to: useCases[21].id, type: 'association' },
            { from: actors[5].id, to: useCases[22].id, type: 'association' },
            { from: actors[5].id, to: useCases[23].id, type: 'association' },
            { from: actors[5].id, to: useCases[24].id, type: 'association' },
            { from: actors[5].id, to: useCases[25].id, type: 'association' },
            
            // Зовнішні системи
            { from: useCases[10].id, to: actors[6].id, type: 'association' }, // Оплата
            { from: useCases[5].id, to: actors[7].id, type: 'association' }, // Email реєстрація
            { from: useCases[10].id, to: actors[7].id, type: 'association' }, // Email замовлення
            { from: useCases[6].id, to: actors[8].id, type: 'association' }, // SMS авторизація
            { from: useCases[11].id, to: actors[9].id, type: 'association' }, // Доставка
            { from: useCases[21].id, to: actors[10].id, type: 'association' } // Склад
        ];

        actorUseCaseRelations.forEach(relation => {
            content += `        <mxCell id="${this.generateId()}" value="" style="endArrow=none;html=1;rounded=0;" edge="1" parent="1" source="${relation.from}" target="${relation.to}">
          <mxGeometry width="50" height="50" relative="1" as="geometry"/>
        </mxCell>
`;
        });

        // Відношення успадкування між акторами
        const inheritanceRelations = [
            { from: actors[1].id, to: actors[0].id, label: 'успадковує' }, // Клієнт від відвідувача
            { from: actors[2].id, to: actors[1].id, label: 'успадковує' }  // VIP від клієнта
        ];

        inheritanceRelations.forEach(relation => {
            content += `        <mxCell id="${this.generateId()}" value="${this.escapeXmlAttribute(relation.label)}" style="endArrow=block;html=1;rounded=0;endFill=0;fontSize=9;" edge="1" parent="1" source="${relation.from}" target="${relation.to}">
          <mxGeometry width="50" height="50" relative="1" as="geometry"/>
        </mxCell>
`;
        });

        // Відношення include та extend між прецедентами
        const useCaseRelations = [
            { from: useCases[5].id, to: useCases[6].id, type: 'include', label: '<<include>>' }, // Реєстрація включає авторизацію
            { from: useCases[8].id, to: useCases[6].id, type: 'include', label: '<<include>>' }, // Кошик включає авторизацію
            { from: useCases[10].id, to: useCases[8].id, type: 'include', label: '<<include>>' }, // Замовлення включає кошик
            { from: useCases[14].id, to: useCases[10].id, type: 'extend', label: '<<extend>>' }, // VIP знижки розширюють замовлення
            { from: useCases[15].id, to: useCases[6].id, type: 'extend', label: '<<extend>>' }, // VIP підтримка розширює авторизацію
            { from: useCases[20].id, to: useCases[18].id, type: 'include', label: '<<include>>' }, // Звіти включають обробку
            { from: useCases[24].id, to: useCases[23].id, type: 'include', label: '<<include>>' } // Налаштування включають управління користувачами
        ];

        useCaseRelations.forEach(relation => {
            const style = relation.type === 'include' ? 
                'endArrow=open;html=1;rounded=0;dashed=1;fontSize=9;' :
                'endArrow=open;html=1;rounded=0;dashed=1;fontSize=9;';
            
            content += `        <mxCell id="${this.generateId()}" value="${this.escapeXmlAttribute(relation.label)}" style="${style}" edge="1" parent="1" source="${relation.from}" target="${relation.to}">
          <mxGeometry width="50" height="50" relative="1" as="geometry"/>
        </mxCell>
`;
        });

        return content;
    }

    // 7. Activity - UML діаграма діяльності (UML Activity Diagram following Visual Paradigm standards)
    // 7. Activity Діаграма - UML діаграма активностей (Wikipedia Standard)
    createActivityDiagram() {
        this.cellCounter = 1;
        let content = '';

        // Initial Node (чорне коло)
        const initialNode = { id: this.generateId(), x: 500, y: 50 };
        content += `        <mxCell id="${initialNode.id}" value="" style="ellipse;whiteSpace=wrap;html=1;fillColor=#000000;strokeColor=#000000;" vertex="1" parent="1">
          <mxGeometry x="${initialNode.x}" y="${initialNode.y}" width="30" height="30" as="geometry"/>
        </mxCell>
`;

        // Swimlanes (партиції) за стандартом UML
        const swimlanes = [
            { id: this.generateId(), x: 50, y: 120, width: 200, height: 900, text: 'Клієнт' },
            { id: this.generateId(), x: 250, y: 120, width: 200, height: 900, text: 'Веб-інтерфейс' },
            { id: this.generateId(), x: 450, y: 120, width: 200, height: 900, text: 'Бізнес-логіка' },
            { id: this.generateId(), x: 650, y: 120, width: 200, height: 900, text: 'База даних' }
        ];

        swimlanes.forEach(lane => {
            content += `        <mxCell id="${lane.id}" value="${this.escapeXmlAttribute(lane.text)}" style="swimlane;html=1;childLayout=stackLayout;resizeParent=1;resizeParentMax=0;startSize=30;fillColor=#e1d5e7;strokeColor=#9673a6;fontSize=12;fontStyle=1;" vertex="1" parent="1">
          <mxGeometry x="${lane.x}" y="${lane.y}" width="${lane.width}" height="${lane.height}" as="geometry"/>
        </mxCell>
`;
        });

        // Activities (заокруглені прямокутники)
        const activities = [
            // Клієнт
            { id: this.generateId(), x: 80, y: 180, text: 'Вхід на сайт', swimlane: 0 },
            { id: this.generateId(), x: 80, y: 380, text: 'Пошук товару', swimlane: 0 },
            { id: this.generateId(), x: 80, y: 580, text: 'Оформлення\\nзамовлення', swimlane: 0 },
            { id: this.generateId(), x: 80, y: 880, text: 'Підтвердження\\nоплати', swimlane: 0 },
            
            // Веб-інтерфейс
            { id: this.generateId(), x: 280, y: 180, text: 'Відображення\\nголовної сторінки', swimlane: 1 },
            { id: this.generateId(), x: 280, y: 280, text: 'Показ каталогу', swimlane: 1 },
            { id: this.generateId(), x: 280, y: 380, text: 'Відображення\\nрезультатів', swimlane: 1 },
            { id: this.generateId(), x: 280, y: 580, text: 'Форма\\nзамовлення', swimlane: 1 },
            
            // Бізнес-логіка
            { id: this.generateId(), x: 480, y: 280, text: 'Отримання\\nкаталогу', swimlane: 2 },
            { id: this.generateId(), x: 480, y: 380, text: 'Обробка\\nпошуку', swimlane: 2 },
            { id: this.generateId(), x: 480, y: 580, text: 'Валідація\\nзамовлення', swimlane: 2 },
            { id: this.generateId(), x: 480, y: 680, text: 'Створення\\nзамовлення', swimlane: 2 },
            { id: this.generateId(), x: 480, y: 780, text: 'Обробка\\nплатежу', swimlane: 2 },
            
            // База даних
            { id: this.generateId(), x: 680, y: 280, text: 'Запит\\nтоварів', swimlane: 3 },
            { id: this.generateId(), x: 680, y: 380, text: 'Пошук в\\nіндексах', swimlane: 3 },
            { id: this.generateId(), x: 680, y: 680, text: 'Збереження\\nзамовлення', swimlane: 3 },
            { id: this.generateId(), x: 680, y: 780, text: 'Логування\\nтранзакції', swimlane: 3 }
        ];

        activities.forEach(activity => {
            const colors = ['#fff2cc', '#dae8fc', '#d5e8d4', '#f8cecc'];
            const strokeColors = ['#d6b656', '#6c8ebf', '#82b366', '#b85450'];
            
            content += `        <mxCell id="${activity.id}" value="${this.escapeXmlAttribute(activity.text)}" style="rounded=1;whiteSpace=wrap;html=1;fillColor=${colors[activity.swimlane]};strokeColor=${strokeColors[activity.swimlane]};fontSize=10;" vertex="1" parent="${swimlanes[activity.swimlane].id}">
          <mxGeometry x="${activity.x - swimlanes[activity.swimlane].x}" y="${activity.y - swimlanes[activity.swimlane].y}" width="120" height="60" as="geometry"/>
        </mxCell>
`;
        });

        // Decision Nodes (ромби)
        const decisionNodes = [
            { id: this.generateId(), x: 130, y: 460, text: 'Товар\\nзнайдено?', swimlane: 0 },
            { id: this.generateId(), x: 530, y: 620, text: 'Дані\\nвалідні?', swimlane: 2 }
        ];

        decisionNodes.forEach(decision => {
            const colors = ['#fff2cc', '#dae8fc', '#d5e8d4', '#f8cecc'];
            const strokeColors = ['#d6b656', '#6c8ebf', '#82b366', '#b85450'];
            
            content += `        <mxCell id="${decision.id}" value="${this.escapeXmlAttribute(decision.text)}" style="rhombus;whiteSpace=wrap;html=1;fillColor=${colors[decision.swimlane]};strokeColor=${strokeColors[decision.swimlane]};fontSize=10;" vertex="1" parent="${swimlanes[decision.swimlane].id}">
          <mxGeometry x="${decision.x - swimlanes[decision.swimlane].x}" y="${decision.y - swimlanes[decision.swimlane].y}" width="80" height="60" as="geometry"/>
        </mxCell>
`;
        });

        // Fork Node (чорна горизонтальна лінія)
        const forkNode = { id: this.generateId(), x: 400, y: 520 };
        content += `        <mxCell id="${forkNode.id}" value="" style="shape=line;html=1;strokeWidth=6;strokeColor=#000000;" vertex="1" parent="1">
          <mxGeometry x="${forkNode.x}" y="${forkNode.y}" width="200" height="10" as="geometry"/>
        </mxCell>
`;

        // Join Node (чорна горизонтальна лінія)
        const joinNode = { id: this.generateId(), x: 400, y: 820 };
        content += `        <mxCell id="${joinNode.id}" value="" style="shape=line;html=1;strokeWidth=6;strokeColor=#000000;" vertex="1" parent="1">
          <mxGeometry x="${joinNode.x}" y="${joinNode.y}" width="200" height="10" as="geometry"/>
        </mxCell>
`;

        // Final Node (чорне коло з білим кільцем)
        const finalNode = { id: this.generateId(), x: 500, y: 950 };
        content += `        <mxCell id="${finalNode.id}" value="" style="ellipse;whiteSpace=wrap;html=1;fillColor=#ffffff;strokeColor=#000000;strokeWidth=6;" vertex="1" parent="1">
          <mxGeometry x="${finalNode.x}" y="${finalNode.y}" width="30" height="30" as="geometry"/>
        </mxCell>
`;
        content += `        <mxCell id="${this.generateId()}" value="" style="ellipse;whiteSpace=wrap;html=1;fillColor=#000000;strokeColor=#000000;" vertex="1" parent="1">
          <mxGeometry x="${finalNode.x + 8}" y="${finalNode.y + 8}" width="14" height="14" as="geometry"/>
        </mxCell>
`;

        // Control Flows (стрілки) 
        const controlFlows = [
            // Початкові потоки
            { from: initialNode.id, to: activities[0].id },
            { from: activities[0].id, to: activities[4].id },
            { from: activities[4].id, to: activities[1].id },
            
            // Міжрівневі потоки
            { from: activities[1].id, to: activities[5].id },
            { from: activities[5].id, to: activities[8].id },
            { from: activities[8].id, to: activities[13].id },
            
            // Пошук
            { from: activities[1].id, to: decisionNodes[0].id },
            { from: decisionNodes[0].id, to: activities[2].id, label: 'Так' },
            { from: activities[2].id, to: activities[6].id },
            { from: activities[6].id, to: activities[9].id },
            { from: activities[9].id, to: activities[14].id },
            
            // Замовлення через fork
            { from: activities[2].id, to: forkNode.id },
            { from: forkNode.id, to: activities[3].id },
            { from: forkNode.id, to: activities[7].id },
            { from: activities[7].id, to: decisionNodes[1].id },
            { from: decisionNodes[1].id, to: activities[10].id, label: 'Так' },
            { from: activities[10].id, to: activities[11].id },
            { from: activities[11].id, to: activities[15].id },
            
            // Платіж
            { from: activities[3].id, to: activities[12].id },
            { from: activities[12].id, to: activities[16].id },
            { from: activities[15].id, to: joinNode.id },
            { from: activities[16].id, to: joinNode.id },
            { from: joinNode.id, to: finalNode.id }
        ];

        controlFlows.forEach(flow => {
            const label = flow.label ? `labelBackgroundColor=#ffffff;` : '';
            content += `        <mxCell id="${this.generateId()}" value="${this.escapeXmlAttribute(flow.label || '')}" style="endArrow=classic;html=1;rounded=0;fontSize=10;${label}strokeWidth=2;" edge="1" parent="1" source="${flow.from}" target="${flow.to}">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
`;
        });

        // Object Flows (пунктирні стрілки з об'єктами)
        const objects = [
            { id: this.generateId(), x: 150, y: 350, text: '[Каталог товарів]' },
            { id: this.generateId(), x: 350, y: 650, text: '[Замовлення]' },
            { id: this.generateId(), x: 550, y: 850, text: '[Чек оплати]' }
        ];

        objects.forEach(obj => {
            content += `        <mxCell id="${obj.id}" value="${this.escapeXmlAttribute(obj.text)}" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#f5f5f5;strokeColor=#666666;fontSize=10;" vertex="1" parent="1">
          <mxGeometry x="${obj.x}" y="${obj.y}" width="100" height="40" as="geometry"/>
        </mxCell>
`;
        });

        // Object flows
        const objectFlows = [
            { from: activities[8].id, to: objects[0].id },
            { from: objects[0].id, to: activities[5].id },
            { from: activities[11].id, to: objects[1].id },
            { from: activities[12].id, to: objects[2].id }
        ];

        objectFlows.forEach(flow => {
            content += `        <mxCell id="${this.generateId()}" value="" style="endArrow=classic;html=1;rounded=0;strokeStyle=dashed;strokeWidth=1;" edge="1" parent="1" source="${flow.from}" target="${flow.to}">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
`;
        });

        return content;
    }

    // 8. Sequence Діаграма - Діаграма послідовностей
    createSequenceDiagram() {
        this.cellCounter = 1;
        let content = '';

        // Учасники взаємодії з розширеними ролями
        const participants = [
            { id: this.generateId(), x: 80, y: 50, text: 'Клієнт' },
            { id: this.generateId(), x: 200, y: 50, text: 'Браузер' },
            { id: this.generateId(), x: 320, y: 50, text: 'Веб-сервер\\n(Nginx)' },
            { id: this.generateId(), x: 440, y: 50, text: 'Laravel\\nController' },
            { id: this.generateId(), x: 560, y: 50, text: 'Eloquent\\nModel' },
            { id: this.generateId(), x: 680, y: 50, text: 'MySQL\\nDatabase' },
            { id: this.generateId(), x: 800, y: 50, text: 'Redis\\nCache' },
            { id: this.generateId(), x: 920, y: 50, text: 'LiqPay\\nAPI' },
            { id: this.generateId(), x: 1040, y: 50, text: 'Email\\nService' }
        ];

        participants.forEach(participant => {
            content += `        <mxCell id="${participant.id}" value="${this.escapeXmlAttribute(participant.text)}" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#dae8fc;strokeColor=#6c8ebf;fontSize=11;fontStyle=1;" vertex="1" parent="1">
          <mxGeometry x="${participant.x}" y="${participant.y}" width="100" height="60" as="geometry"/>
        </mxCell>
`;

            // Лінії життя (lifelines)
            content += `        <mxCell id="${this.generateId()}" value="" style="endArrow=none;dashed=1;html=1;strokeWidth=2;strokeColor=#666666;" edge="1" parent="1">
          <mxGeometry width="50" height="50" relative="1" as="geometry">
            <mxPoint x="${participant.x + 50}" y="110" as="sourcePoint"/>
            <mxPoint x="${participant.x + 50}" y="1500" as="targetPoint"/>
          </mxGeometry>
        </mxCell>
`;
        });

        // Детальні повідомлення взаємодії з покращеним позиціонуванням стрілок
        const messages = [
            // Початок сценарію - відкриття сайту
            { from: 0, to: 1, y: 150, text: '1: відкрити сайт електронного магазину', type: 'sync' },
            { from: 1, to: 2, y: 170, text: '2: HTTP GET /', type: 'sync' },
            { from: 2, to: 3, y: 190, text: '3: route(\"/\")', type: 'sync' },
            { from: 3, to: 6, y: 210, text: '4: get(\"homepage_cache\")', type: 'sync' },
            { from: 6, to: 3, y: 230, text: '5: cached_data || null', type: 'return' },
            
            // Якщо кеш порожній - завантаження з БД
            { from: 3, to: 3, y: 270, text: '6: ProductController::index()', type: 'self' },
            { from: 3, to: 4, y: 290, text: '7: Product::with(\"category\")->featured()', type: 'sync' },
            { from: 4, to: 5, y: 310, text: '8: SELECT * FROM products WHERE featured=1', type: 'sync' },
            { from: 5, to: 4, y: 330, text: '9: featured_products[]', type: 'return' },
            { from: 4, to: 3, y: 350, text: '10: Collection<Product>', type: 'return' },
            { from: 3, to: 6, y: 370, text: '11: cache()->put(\"homepage\", $data, 3600)', type: 'sync' },
            { from: 3, to: 2, y: 390, text: '12: view(\"homepage\", $products)', type: 'return' },
            { from: 2, to: 1, y: 410, text: '13: HTML response', type: 'return' },
            { from: 1, to: 0, y: 430, text: '14: відображення головної сторінки', type: 'return' },
            
            // Пошук товарів
            { from: 0, to: 1, y: 490, text: '15: ввести пошуковий запит \"iPhone\"', type: 'sync' },
            { from: 1, to: 2, y: 510, text: '16: HTTP GET /search?q=iPhone', type: 'sync' },
            { from: 2, to: 3, y: 530, text: '17: route(\"/search\")', type: 'sync' },
            { from: 3, to: 3, y: 550, text: '18: ProductController::search($query)', type: 'self' },
            { from: 3, to: 4, y: 570, text: '19: Product::search(\"iPhone\")->paginate()', type: 'sync' },
            { from: 4, to: 5, y: 590, text: '20: SELECT * FROM products WHERE name LIKE \"%iPhone%\"', type: 'sync' },
            { from: 5, to: 4, y: 610, text: '21: search_results[]', type: 'return' },
            { from: 4, to: 3, y: 630, text: '22: PaginatedCollection', type: 'return' },
            { from: 3, to: 2, y: 650, text: '23: view(\"search\", $results)', type: 'return' },
            { from: 2, to: 1, y: 670, text: '24: HTML response with products', type: 'return' },
            { from: 1, to: 0, y: 690, text: '25: список знайдених товарів', type: 'return' },
            
            // Додавання в кошик
            { from: 0, to: 1, y: 750, text: '26: натиснути \"Додати в кошик\"', type: 'sync' },
            { from: 1, to: 2, y: 770, text: '27: HTTP POST /cart/add + product_id=123', type: 'sync' },
            { from: 2, to: 3, y: 790, text: '28: CartController::add($productId)', type: 'sync' },
            { from: 3, to: 3, y: 810, text: '29: middleware(\"auth\")', type: 'self' },
            { from: 3, to: 4, y: 830, text: '30: User::find($userId)', type: 'sync' },
            { from: 4, to: 5, y: 850, text: '31: SELECT * FROM users WHERE id=?', type: 'sync' },
            { from: 5, to: 4, y: 870, text: '32: user_data', type: 'return' },
            { from: 4, to: 3, y: 890, text: '33: User model', type: 'return' },
            { from: 3, to: 4, y: 910, text: '34: Cart::create([user_id, product_id, qty])', type: 'sync' },
            { from: 4, to: 5, y: 930, text: '35: INSERT INTO cart_items VALUES(...)', type: 'sync' },
            { from: 5, to: 4, y: 950, text: '36: affected_rows: 1', type: 'return' },
            { from: 4, to: 3, y: 970, text: '37: CartItem model', type: 'return' },
            { from: 3, to: 2, y: 990, text: '38: JSON {\"success\": true, \"cart_count\": 3}', type: 'return' },
            { from: 2, to: 1, y: 1010, text: '39: HTTP 200 + JSON response', type: 'return' },
            { from: 1, to: 0, y: 1030, text: '40: оновлення лічильника кошика', type: 'return' },
            
            // Оформлення замовлення та оплата
            { from: 0, to: 1, y: 1090, text: '41: перейти до оформлення замовлення', type: 'sync' },
            { from: 1, to: 2, y: 1110, text: '42: HTTP POST /checkout + form_data', type: 'sync' },
            { from: 2, to: 3, y: 1130, text: '43: CheckoutController::process()', type: 'sync' },
            { from: 3, to: 4, y: 1150, text: '44: Order::create($validated_data)', type: 'sync' },
            { from: 4, to: 5, y: 1170, text: '45: DB::transaction(function() {...})', type: 'sync' },
            { from: 5, to: 5, y: 1190, text: '46: BEGIN TRANSACTION', type: 'self' },
            { from: 4, to: 5, y: 1210, text: '47: INSERT INTO orders VALUES(...)', type: 'sync' },
            { from: 4, to: 5, y: 1230, text: '48: INSERT INTO order_items SELECT...', type: 'sync' },
            { from: 4, to: 5, y: 1250, text: '49: UPDATE products SET stock=stock-qty', type: 'sync' },
            { from: 4, to: 5, y: 1270, text: '50: DELETE FROM cart_items WHERE user_id=?', type: 'sync' },
            { from: 5, to: 4, y: 1290, text: '51: COMMIT', type: 'return' },
            { from: 4, to: 3, y: 1310, text: '52: Order model with relations', type: 'return' },
            { from: 3, to: 7, y: 1330, text: '53: LiqPayService::createPayment($order)', type: 'sync' },
            { from: 7, to: 7, y: 1350, text: '54: HTTP POST /api/payment + order_data', type: 'self' },
            { from: 7, to: 3, y: 1370, text: '55: payment_form_html + checkout_url', type: 'return' },
            { from: 3, to: 8, y: 1390, text: '56: Mail::send(\"order_confirmation\", $order)', type: 'async' },
            { from: 3, to: 2, y: 1410, text: '57: redirect()->to($payment_url)', type: 'return' },
            { from: 2, to: 1, y: 1430, text: '58: HTTP 302 Location: payment_gateway', type: 'return' },
            { from: 1, to: 0, y: 1450, text: '59: форма оплати LiqPay', type: 'return' }
        ];

        messages.forEach(message => {
            const fromX = participants[message.from].x + 50;
            const toX = participants[message.to].x + 50;
            const isReturn = message.type === 'return';
            const isAsync = message.type === 'async';
            const isSelf = message.type === 'self';
            
            let arrowStyle = '';
            let lineStyle = 'solid';
            
            if (isReturn) {
                arrowStyle = 'startArrow=none;endArrow=open;';
                lineStyle = 'dashed';
            } else if (isAsync) {
                arrowStyle = 'startArrow=none;endArrow=classic;';
                lineStyle = 'dashed';
            } else {
                arrowStyle = 'startArrow=none;endArrow=classic;';
            }
            
            if (isSelf) {
                // Self message (loop back)
                content += `        <mxCell id="${this.generateId()}" value="${this.escapeXmlAttribute(message.text)}" style="${arrowStyle}html=1;rounded=0;strokeStyle=${lineStyle};fontSize=9;labelPosition=center;verticalLabelPosition=top;align=center;verticalAlign=bottom;" edge="1" parent="1">
          <mxGeometry width="50" height="30" relative="1" as="geometry">
            <mxPoint x="${fromX}" y="${message.y}" as="sourcePoint"/>
            <mxPoint x="${fromX + 60}" y="${message.y}" as="targetPoint"/>
            <Array as="points">
              <mxPoint x="${fromX + 30}" y="${message.y}"/>
              <mxPoint x="${fromX + 60}" y="${message.y}"/>
              <mxPoint x="${fromX + 60}" y="${message.y + 20}"/>
              <mxPoint x="${fromX}" y="${message.y + 20}"/>
            </Array>
          </mxGeometry>
        </mxCell>
`;
            } else {
                // Regular message
                content += `        <mxCell id="${this.generateId()}" value="${this.escapeXmlAttribute(message.text)}" style="${arrowStyle}html=1;rounded=0;strokeStyle=${lineStyle};fontSize=9;labelPosition=center;verticalLabelPosition=top;align=center;verticalAlign=bottom;" edge="1" parent="1">
          <mxGeometry width="50" height="50" relative="1" as="geometry">
            <mxPoint x="${fromX}" y="${message.y}" as="sourcePoint"/>
            <mxPoint x="${toX}" y="${message.y}" as="targetPoint"/>
          </mxGeometry>
        </mxCell>
`;
            }
        });

        // Activation boxes (прямокутники активації)
        const activationBoxes = [
            { participant: 1, start: 170, end: 430, text: 'Browser processing' },
            { participant: 2, start: 190, end: 410, text: 'Server handling' },
            { participant: 3, start: 210, end: 390, text: 'Controller logic' },
            { participant: 4, start: 290, end: 350, text: 'Model operations' },
            { participant: 5, start: 310, end: 330, text: 'Database query' },
            { participant: 6, start: 210, end: 230, text: 'Cache check' },
            { participant: 6, start: 370, end: 390, text: 'Cache store' },
            
            { participant: 1, start: 510, end: 690, text: 'Search processing' },
            { participant: 2, start: 530, end: 670, text: 'Search handling' },
            { participant: 3, start: 550, end: 650, text: 'Search logic' },
            { participant: 4, start: 570, end: 630, text: 'Search query' },
            { participant: 5, start: 590, end: 610, text: 'Search execution' },
            
            { participant: 1, start: 770, end: 1030, text: 'Cart operations' },
            { participant: 2, start: 790, end: 1010, text: 'Cart handling' },
            { participant: 3, start: 810, end: 990, text: 'Cart controller' },
            { participant: 4, start: 830, end: 970, text: 'User & Cart models' },
            { participant: 5, start: 850, end: 950, text: 'DB operations' },
            
            { participant: 1, start: 1110, end: 1450, text: 'Checkout flow' },
            { participant: 2, start: 1130, end: 1430, text: 'Order processing' },
            { participant: 3, start: 1150, end: 1410, text: 'Order controller' },
            { participant: 4, start: 1170, end: 1310, text: 'Order creation' },
            { participant: 5, start: 1190, end: 1290, text: 'Transaction' },
            { participant: 7, start: 1330, end: 1370, text: 'Payment API' },
            { participant: 8, start: 1390, end: 1390, text: 'Email sending' }
        ];

        activationBoxes.forEach(box => {
            const x = participants[box.participant].x + 45;
            const height = box.end - box.start;
            
            content += `        <mxCell id="${this.generateId()}" value="" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#f8f8f8;strokeColor=#999999;opacity=80;" vertex="1" parent="1">
          <mxGeometry x="${x}" y="${box.start}" width="10" height="${height}" as="geometry"/>
        </mxCell>
`;
        });

        // Notes and comments for clarification
        const notes = [
            { x: 1200, y: 200, text: 'Кешування головної\\nсторінки для\\nоптимізації швидкості' },
            { x: 1200, y: 400, text: 'Lazy loading\\nвідгуків та\\nрейтингів' },
            { x: 1200, y: 800, text: 'Middleware auth\\nперевіряє сесію\\nкористувача' },
            { x: 1200, y: 1200, text: 'Атомарна транзакція\\nзабезпечує цілісність\\nданих замовлення' }
        ];

        notes.forEach(note => {
            content += `        <mxCell id="${this.generateId()}" value="${this.escapeXmlAttribute(note.text)}" style="shape=note;whiteSpace=wrap;html=1;backgroundOutline=1;darkOpacity=0.05;fillColor=#fff2cc;strokeColor=#d6b656;fontSize=9;" vertex="1" parent="1">
          <mxGeometry x="${note.x}" y="${note.y}" width="120" height="80" as="geometry"/>
        </mxCell>
`;
        });

        return content;
    }

    // Generate all comprehensive diagrams
    generateAllDiagrams() {
        console.log('🔄 Створення повного набору діаграм для аналізу системи...');

        const diagrams = [
            {
                id: 'fdd',
                name: 'FDD - Діаграма функціональної декомпозиції',
                content: this.createFDDDiagram()
            },
            {
                id: 'sadt',
                name: 'SADT - Структурний аналіз та проектування (IDEF0)',
                content: this.createSADTDiagram()
            },
            {
                id: 'dfd',
                name: 'DFD - Діаграма потоків даних',
                content: this.createDFDDiagram()
            },
            {
                id: 'er',
                name: 'ER - Діаграма сутність-зв\'язок',
                content: this.createERDiagram()
            },
            {
                id: 'bpmn',
                name: 'BPMN - Діаграма бізнес-процесів',
                content: this.createBPMNDiagram()
            },
            {
                id: 'usecase',
                name: 'Use Case - Діаграма прецедентів',
                content: this.createUseCaseDiagram()
            },
            {
                id: 'activity',
                name: 'Activity - Діаграма діяльності',
                content: this.createActivityDiagram()
            },
            {
                id: 'sequence',
                name: 'Sequence - Діаграма послідовності',
                content: this.createSequenceDiagram()
            }
        ];

        // Generate XML
        const drawioTemplate = `<?xml version="1.0" encoding="UTF-8"?>
<mxfile host="app.diagrams.net" modified="2025-07-08T15:00:00.000Z" agent="ComprehensiveDiagramGenerator" etag="kosyanchuk_comprehensive_v3" version="24.6.4" type="device" pages="${diagrams.length}">
{pages}
</mxfile>`;

        const pageTemplate = `  <diagram id="{id}" name="{name}">
    <mxGraphModel dx="1422" dy="827" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1169" pageHeight="827" math="0" shadow="0">
      <root>
        <mxCell id="0"/>
        <mxCell id="1" parent="0"/>
{content}
      </root>
    </mxGraphModel>
  </diagram>`;

        const pagesXml = diagrams.map(diagram => 
            pageTemplate
                .replace('{id}', diagram.id)
                .replace('{name}', this.escapeXmlAttribute(diagram.name))
                .replace('{content}', diagram.content)
        ).join('\n');

        const finalXml = drawioTemplate.replace('{pages}', pagesXml);

        // Save to file
        const outputPath = path.join(__dirname, 'Kosyanchuk_Comprehensive_Diagrams.drawio');
        fs.writeFileSync(outputPath, finalXml, 'utf8');

        console.log(`✅ Comprehensive diagrams created: ${outputPath}`);
        console.log('📊 Generated diagrams:');
        console.log('🏗️  Структурно-функціональний аналіз:');
        diagrams.slice(0, 5).forEach((d, i) => {
            console.log(`   ${i + 1}. ${d.name}`);
        });
        console.log('🎯 Об\'єктно-орієнтований аналіз:');
        diagrams.slice(5).forEach((d, i) => {
            console.log(`   ${i + 6}. ${d.name}`);
        });

        return outputPath;
    }
}

// Execute the comprehensive generation
const generator = new ComprehensiveDiagramGenerator();
generator.generateAllDiagrams();
