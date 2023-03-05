<template>
<Head>
  <title>Tickets</title>
</Head>
<main class="container">
    <div class="columns">
      <SideNav/>
      <div class="column">
        <NavTree/>
        <div class="panel">
          <div class="panel-heading">
            Tickets
          </div>
          <div class="panel-block">
            <p class="control has-icons-left">
              <input class="input" type="text" placeholder="Search">
            </p>
          </div>
          <div class="panel-block tabs is-centered is-boxed">
            <ul>
              <li class="is-active">
                <a>
                  <span>All</span>
                </a>
              </li>
              <li>
                <a>
                  <span>Pending</span>
                </a>
              </li>
              <li>
                <a>
                  <span>Resolved</span>
                </a>
              </li>
              <li>
                <a>
                  <span>Exceptions</span>
                </a>
              </li>
            </ul>
          </div>
          <div class="panel-block is-flex is-justify-content-center is-flex-direction-column">
            <table class="table is-bordered is-striped is-truncated">
              <thead>
              <tr>
                <th width="120">Action</th>
                <th width="100">Paybill</th>
                <th width="100">Issue</th>
                <th width="100">Reference</th>
                <th width="100">Amount</th>
                <th width="100">Date</th>
                <th width="163">Safaricom</th>
                <th width="163">Airtel</th>
                <th width="120">Urgency</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(item, index) in tickets" :key="index">
                <td class="is-flex is-justify-content-space-between">
                  <form action="resolve/{{item.id}}" class="inline"
                        method="post">
                    <button class="button is-success" v-if="item.status !== 'R'">✓</button>
                    <button class="button is-success" disabled v-else>✓</button>
                  </form>
                  <form class="inline" action="/close/{{item.id}}"
                        method="post">
                    <button class="button is-warning" v-if="item.status !== 'C'">𐌗</button>
                    <button class="button is-warning" disabled v-else>𐌗</button>
                  </form>
                </td>
                <td>{{ item.paybill_no }}</td>
                <td>{{ item.issue }}</td>
                <td>{{ item.reference }}</td>
                <td>{{ item.amount }}</td>
                <td>{{ item.transaction_date }}</td>
                <td>{{ item.safaricom_no }}</td>
                <td>{{ item.airtel_no }}</td>
                <td>{{ item.urgency }}</td>
              </tr>
              </tbody>
            </table>
            <nav class="pagination is-centered" role="navigation" aria-label="pagination">
              <a class="pagination-previous">Previous</a>
              <a class="pagination-next">Next</a>
              <ul class="pagination-list">
                <li><a class="pagination-link" aria-label="Goto page 45"
                       href="">Prev</a></li>
                <li><a class="pagination-link is-current" aria-label="Page 46"
                       aria-current="page">1</a></li>
                <li><a class="pagination-link" aria-label="Goto page 47"
                       href="">Next</a></li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
const { data } = await useFetch('/api/tickets')
const tickets = data.value
</script>

<style scoped>

</style>